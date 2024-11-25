export const playSound = (sound, volume = 0.5) => {
    const audio = new Audio(sound);
    audio.volume = volume;
    audio.play();
};
