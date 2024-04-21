const getAnchorOptions = (target, link, referrer = {}) => {
  const inPage = !link || link === "#";
  target = inPage ? {} : { target: target || "_blank", rel: "noreferrer" };
  referrer = inPage ? {} : referrer;
  const completeHref =
    link.startsWith("https://") || link.startsWith("http://")
      ? { href: link }
      : { href: `http://${link}` };

  return { ...target, ...completeHref, ...referrer };
};

export default getAnchorOptions;
