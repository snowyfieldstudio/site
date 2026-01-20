import { groq } from 'next-sanity';

export const clientsQuery = groq`
  *[_type == "client"] | order(year desc) {
    _id,
    name,
    year,
    focus,
    samples[]{
      deviceType,
      sampleType,
      image,
      videoPlaybackId
    }
  }
`;

export const contactsQuery = groq`
  *[_type == "contact"] {
    type,
    value
  }
`;
