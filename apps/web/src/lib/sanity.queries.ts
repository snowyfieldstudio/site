import { groq } from 'next-sanity';

export const clientsQuery = groq`
  *[_type == "client"] | order(year desc) {
    _id,
    name,
    "slug": slug.current,
    displayUrl,
    year,
    focus,
    samples[]{
      deviceType,
      sampleType,
      image{
        asset->{
          _id,
          url,
          metadata{
            dimensions{
              width,
              height
            }
          }
        }
      },
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
