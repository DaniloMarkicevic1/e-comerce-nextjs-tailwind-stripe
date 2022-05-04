import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder as UrlBuilder } from 'next-sanity-image';

export const client = sanityClient({
    projectId: 'tpd62ws9',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder: UrlBuilder = ImageUrlBuilder(client);

export const urlFor: any = (source: any) => builder.image(source);
