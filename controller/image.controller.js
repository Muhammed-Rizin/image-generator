import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { NVIDIA } from "../config/config.js";

import axios from "axios";
import ErrorHandler from "../utils/errorHandler.js";
import Response from "../utils/responseHandler.js";

export const generate = asyncErrorHandler(async (req) => {
  let { text } = req.body;
  text = String(text).trim();

  if (!text) throw new ErrorHandler("Provide prompt for generate image", 400);

  const payload = {
    text_prompts: [
      { text, weight: 1 },
      { text: "", weight: -1 },
    ],
    cfg_scale: 5,
    sampler: "K_EULER_ANCESTRAL",
    seed: 0,
    steps: 25,
  };

  const response = await axios.post(NVIDIA.API_URL, payload, {
    headers: { Authorization: `Bearer ${NVIDIA.API_KEY}`, Accept: "application/json" },
  });

  if (!response) throw new ErrorHandler("Error to generate image", 400);

  return new Response("Success", { data: response.data.artifacts[0].base64 }, 200);
});
