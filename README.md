# drawwave

I want to learn to plot soundwaves using:

1. The Web Audio API (WAAPI, I guess?)
2. SVG
3. An moving window alogirthm to smooth the waveform 

There are a lot of good libraries for doing this but I want
to learn how to do it for fun (and to improve my understanding
of 1-3).

Game plan:

1. Load a small `wav` with fetch and play it.
2. Extract signal from audioBuffer with WAAPI
3. Create an SVG plot
4. Render plot as area rather than line
5. Apply smoothing to the curve
