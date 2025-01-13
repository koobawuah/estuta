import invariant from "tiny-invariant";

invariant(process.env.SECRET, "SECRET must be set");


export const settings = {
    secret: process.env.SECRET,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
}