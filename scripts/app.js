// fork getUserMedia for multiple browser versions, for the future
// when more browsers support MediaRecorder

navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

// set up basic variables for app

var soundClips = document.querySelector('.sound-clips');

// visualiser setup - create web audio api context and canvas



function f() {
  var select = document.getElementById('which_sentence');
  var clipName = select.options[select.selectedIndex].value;
  // select.selectedIndex += 1;
  var sylls = clipName.replace(/xizi/g, "xi zi").replace(/[.?!"() ]/g, " ").split(" ").filter(a => a.length >= 1);
  var cleaned_clipname = clipName.replace(/[.?!"() ]/g, " ").split(" ").filter(a => a.length >= 1).join("_");

  var clipContainer = document.createElement('article');
  var text_human = document.createElement('p');
  var text_synth = document.createElement('p');
  var clipLabel = document.createElement('p');
  var human_audio_tag = document.createElement('audio');
  var synth_audio_tag = document.createElement('audio');
  human_audio_tag.src = `audio_sentences/${cleaned_clipname}.oga`;

  let uris = sylls.map(a => `audio_syllables/${a}.mp3`);
  let proms = uris.map(uri => fetch(uri).then(r => r.blob()));
  Promise.all(proms).then(blobs => {
    let blob = new Blob([...blobs]),
      blobUrl = URL.createObjectURL(blob),
      synth_audio = new Audio(blobUrl);
    synth_audio_tag.src = URL.createObjectURL(synth_audio);
    synth_audio.playbackRate = 2;
    synth_audio_tag.playbackRate = 2;
    synth_audio.play();

    clipContainer.classList.add('clip');
    human_audio_tag.setAttribute('controls', '');

    clipLabel.innerHTML = clipName;

    text_human.innerHTML = "Human: ";
    text_synth.innerHTML = "Primitive Synth: ";
    clipContainer.appendChild(text_human);
    clipContainer.appendChild(human_audio_tag);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(text_synth);
    clipContainer.appendChild(synth_audio_tag);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(document.createElement("hr"));

    //text_synth.innerHTML = "Crude synthesis: ";
    //clipContainer.appendChild(text_synth);
    //clipContainer.appendChild(synth_audio);

    soundClips.appendChild(clipContainer);
  });

}