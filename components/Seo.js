import Head from "next/head";

const Seo = () => {
  return (
    <Head>
      <title>Weather Forecast</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@madera_marco" />
      <meta name="twitter:site" content="@madera_marco" />
      <meta property="og:title" content="Weather Forecast" />
      <meta name="twitter:title" content="Weather Forecast" />
      <meta
        name="description"
        content="The Weather Report in the next 4 days"
      />
      <meta
        property="og:description"
        content="The Weather Report in the next 4 days"
      />
      <meta
        name="twitter:description"
        content="The Weather Report in the next 4 days"
      />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/image.png`}
      />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/image.png`}
      />
    </Head>
  );
};

export default Seo;
