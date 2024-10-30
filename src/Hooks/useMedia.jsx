import React from 'react'

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);
// Essa funcao vai ocorrer sempre que houver um resize na página
  React.useEffect(() => {
    function changesMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    changesMatch();
    window.addEventListener('resize', changesMatch);
    return () => {
      window.removeEventListener('resize', changesMatch);
    }
  }, [media])

  return match;
}

export default useMedia
