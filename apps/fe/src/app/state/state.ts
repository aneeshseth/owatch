import { atom, selector } from "recoil";

export const vidState = atom({
    key: 'videoselected', 
    default: {
        id: 0,
        thumbnail: "",
        username: "",
        transcoded: []
    }, 
});


export const vidCurrentState = selector({
    key: 'vidCurrState', 
    get: ({get}) => {
      const text = get(vidState);
      return text
    },
});

export const videoQuality = atom({
    key: 'videoquality', 
    default: ""
});

export const vidCurrentQuality = selector({
    key: 'vidCurrQuality', 
    get: ({get}) => {
      const text = get(videoQuality);
      return text
    },
});