export const _CONFIG = {
  bookingUrl: (website: WebsiteData) =>
    `${
      process.env.NODE_ENV === "production"
        ? `${process.env.BOOKING_APP_URL}/`
        : `http://localhost:${process.env.BOOKING_DEV_PORT}/`
    }?in=${website.orgId}&name=${website.general.name || ""}}`,
};
