

export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function useSEO(initialMeta?: MetaTags) {
  // route is not used in this simple implementation, so we remove it to avoid lint errors
  // const route = useRoute(); 

  const updateMeta = (meta: MetaTags) => {
    if (meta.title) {
      document.title = meta.title;
      updateMetaTag('og:title', meta.title);
      updateMetaTag('twitter:title', meta.title);
    }
    
    if (meta.description) {
      updateMetaTag('description', meta.description);
      updateMetaTag('og:description', meta.description);
      updateMetaTag('twitter:description', meta.description);
    }
    
    if (meta.image) {
      updateMetaTag('og:image', meta.image);
      updateMetaTag('twitter:image', meta.image);
    }
    
    if (meta.url) {
      updateMetaTag('og:url', meta.url);
    }
  };

  const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) ||
                  document.querySelector(`meta[property="${name}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  const addStructuredData = (data: Record<string, any>) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  };

  // Apply initial meta if provided
  if (initialMeta) {
    updateMeta(initialMeta);
  }

  return {
    updateMeta,
    addStructuredData,
  };
}
