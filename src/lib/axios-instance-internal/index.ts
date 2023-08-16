import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

const BASE_URL = publicRuntimeConfig.BASE_URL;

const instances = axios.create({
  baseURL: `${BASE_URL}`,
});

export default instances;
