import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return {
    someData: apiKey,
  };
};
