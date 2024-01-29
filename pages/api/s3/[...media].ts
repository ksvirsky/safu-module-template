import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-s3/dist/handlers'
import { UsernamePasswordAuthJSProvider } from 'tinacms-authjs/dist/tinacms';

export const config = mediaHandlerConfig

export default createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET || '',
  authorized: async (req, _res) => {
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    try {
      const auth = new UsernamePasswordAuthJSProvider();

      const isAuth = await auth.isAuthorized(req);

      return isAuth;
    } catch (e) {
      console.error(e);

      return false;
    }
  },
},
  {
    cdnUrl: "https://reports.atomica.org"
  },
);