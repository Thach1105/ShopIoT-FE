import axios from "axios";
import config from "../configs/config";

const url = config.url_Backend;

export async function getReviews(productId, number, size, rating) {
  const reqURL = `${url}/reviews/forProductByRating/${productId}?${
    number ? `number=${number}` : ""
  }${size ? `&size=${size}` : ""}${rating ? `&rating=${rating}` : ""}`;
  const response = await axios.get(reqURL);

  return response;
}

export async function getOverallReviews(productId) {
  const response = await axios.get(`${url}/reviews/overall/${productId}`);

  return response;
}
