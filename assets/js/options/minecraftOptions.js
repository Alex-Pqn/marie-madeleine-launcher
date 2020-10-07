const timeoutStatus = 75;
const defaultValueMessage = 'Les valeurs ont été remises par défaut.';
const changeMessage = 'Les changements ont été pris en compte.';

displayStatus = (value, background, color, container, paragraph, closeText) => {
  closeStatus();
  container.style.height = 0;
  container.style.opacity = 0;
  setTimeout(() => {
    container.style.height = 'auto';
    container.style.opacity = 1;
    container.style.backgroundColor = background;

    paragraph.innerHTML = value;
    paragraph.style.padding = '3px 8px';
    paragraph.style.color = color;

    closeText.innerHTML = '×';
    closeText.style.color = color;
  }, timeoutStatus);
};

// RAM
const containerStatusRam = document.getElementById('container-status-ram');
const paragraphStatusRam = document.getElementById('status-ram');
const closeTextStatusRam = document.getElementById('close-status-ram');

storeRam = (getMinRam, getMaxRam) => {
  const inputMinRam = document.getElementById('min-ram');
  const inputMaxRam = document.getElementById('max-ram');

  const defaultMaxRam = 3584;
  const defaultMinRam = 2048;

  inputMinRam.value = getMinRam;
  inputMaxRam.value = getMaxRam;

  // minRam,maxRam not defined
  if (getMinRam === undefined) {
    storeSet('minecraftOptionMinRam', defaultMinRam);
    inputMinRam.value = defaultMinRam;
  }
  if (getMaxRam === undefined) {
    storeSet('minecraftOptionMaxRam', defaultMaxRam);
    inputMaxRam.value = defaultMaxRam;
  }

  // button reset ram
  document.getElementById('button-reset-ram').addEventListener('click', () => {
    storeSet('minecraftOptionMinRam', defaultMinRam);
    storeSet('minecraftOptionMaxRam', defaultMaxRam);
    inputMinRam.value = defaultMinRam;
    inputMaxRam.value = defaultMaxRam;
    displayStatus(
      defaultValueMessage,
      'rgb(197, 95, 0)',
      'white',
      containerStatusRam,
      paragraphStatusRam,
      closeTextStatusRam
    );
  });

  // button save ram
  document.getElementById('button-save-ram').addEventListener('click', () => {
    if (
      inputMinRam.value == '' ||
      parseInt(inputMinRam.value) > defaultMinRam
    ) {
      storeSet('minecraftOptionMinRam', Math.floor(inputMinRam.value));
    }
    if (
      inputMaxRam.value == '' ||
      parseInt(inputMaxRam.value) > defaultMaxRam
    ) {
      storeSet('minecraftOptionMaxRam', Math.floor(inputMaxRam.value));
    }

    if (
      inputMinRam.value == '' ||
      parseInt(inputMinRam.value) < defaultMinRam
    ) {
      displayStatus(
        `Min. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (${defaultMinRam} Mo).`,
        'rgb(122, 0, 0)',
        'white',
        containerStatusRam,
        paragraphStatusRam,
        closeTextStatusRam
      );
    } else if (
      inputMaxRam.value == '' ||
      parseInt(inputMaxRam.value) < defaultMaxRam
    ) {
      displayStatus(
        `Max. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (${defaultMaxRam} Mo).`,
        'rgb(122, 0, 0)',
        'white',
        containerStatusRam,
        paragraphStatusRam,
        closeTextStatusRam
      );
    } else {
      displayStatus(
        changeMessage,
        'rgb(0, 80, 0)',
        'white',
        containerStatusRam,
        paragraphStatusRam,
        closeTextStatusRam
      );
    }
  });
};

// JVM
const containerStatusJvm = document.getElementById('container-status-jvm');
const paragraphStatusJvm = document.getElementById('status-jvm');
const closeTextStatusJvm = document.getElementById('close-status-jvm');

storeJvm = (getJvm) => {
  const inputJvm = document.getElementById('jvm');
  inputJvm.value = getJvm;

  const defaultJvm = [];
  const maxLengthJvm = 500;

  // jvm not defined
  if (getJvm === undefined) {
    storeSet('minecraftOptionJvm', defaultJvm);
    inputJvm.value = defaultJvm;
  }

  // button reset jvm
  document.getElementById('button-reset-jvm').addEventListener('click', () => {
    storeSet('minecraftOptionJvm', defaultJvm);
    inputJvm.value = defaultJvm;
    displayStatus(
      defaultValueMessage,
      'rgb(197, 95, 0)',
      'white',
      containerStatusJvm,
      paragraphStatusJvm,
      closeTextStatusJvm
    );
  });

  // button save jvm
  document.getElementById('button-save-jvm').addEventListener('click', () => {
    if (inputJvm.value.length > maxLengthJvm) {
      displayStatus(
        `Vous ne pouvez pas inscrire une valeur supérieur à ${maxLengthJvm} caractères.`,
        'rgb(122, 0, 0)',
        'white',
        containerStatusJvm,
        paragraphStatusJvm,
        closeTextStatusJvm
      );
    } else if (inputJvm.value.length === 0) {
      storeSet('minecraftOptionJvm', defaultJvm);
      displayStatus(
        changeMessage,
        'rgb(0, 80, 0)',
        'white',
        containerStatusJvm,
        paragraphStatusJvm,
        closeTextStatusJvm
      );
    } else {
      storeSet('minecraftOptionJvm', [inputJvm.value]);
      displayStatus(
        changeMessage,
        'rgb(0, 80, 0)',
        'white',
        containerStatusJvm,
        paragraphStatusJvm,
        closeTextStatusJvm
      );
    }
  });
};

// RES
const containerStatusRes = document.getElementById('container-status-res');
const paragraphStatusRes = document.getElementById('status-res');
const closeTextStatusRes = document.getElementById('close-status-res');

storeRes = (getHeightRes, getWidthRes, getFullscreenRes) => {
  const inputHeightRes = document.getElementById('height-res');
  const inputWidthRes = document.getElementById('width-res');
  const inputFullscreenRes = document.getElementById('fullscreen-res');

  const defaultHeightRes = 1080;
  const defaultWidthRes = 1920;
  const defaultFullscreenRes = true;

  inputHeightRes.value = getHeightRes;
  inputWidthRes.value = getWidthRes;
  inputFullscreenRes.checked = getFullscreenRes;

  // heightRes.widthRes.fullscreenRes not defined
  if (getHeightRes === undefined) {
    storeSet('minecraftOptionHeightRes', defaultHeightRes);
    inputHeightRes.value = defaultHeightRes;
  }
  if (getWidthRes === undefined) {
    storeSet('minecraftOptionWidthRes', defaultWidthRes);
    inputWidthRes.value = defaultWidthRes;
  }
  if (getFullscreenRes === undefined) {
    storeSet('minecraftOptionFullscreenRes', defaultFullscreenRes);
    inputFullscreenRes.checked = defaultFullscreenRes;
  }

  // button reset res
  document.getElementById('button-reset-res').addEventListener('click', () => {
    storeSet('minecraftOptionHeightRes', defaultHeightRes);
    storeSet('minecraftOptionWidthRes', defaultWidthRes);
    storeSet('minecraftOptionFullscreenRes', defaultFullscreenRes);
    inputHeightRes.value = defaultHeightRes;
    inputWidthRes.value = defaultWidthRes;
    inputFullscreenRes.checked = defaultFullscreenRes;
    displayStatus(
      defaultValueMessage,
      'rgb(197, 95, 0)',
      'white',
      containerStatusRes,
      paragraphStatusRes,
      closeTextStatusRes
    );
  });

  // button save res
  document.getElementById('button-save-res').addEventListener('click', () => {
    storeSet('minecraftOptionHeightRes', Math.floor(inputHeightRes.value));
    storeSet('minecraftOptionWidthRes', Math.floor(inputWidthRes.value));
    storeSet('minecraftOptionFullscreenRes', inputFullscreenRes.checked);

    displayStatus(
      changeMessage,
      'rgb(0, 80, 0)',
      'white',
      containerStatusRes,
      paragraphStatusRes,
      closeTextStatusRes
    );
  });
};

// Close status
closeStatus = () => {
  // ram
  containerStatusRam.style.height = 0;
  containerStatusRam.style.opacity = 0;
  // jvm
  containerStatusJvm.style.height = 0;
  containerStatusJvm.style.opacity = 0;
  // res
  containerStatusRes.style.height = 0;
  containerStatusRes.style.opacity = 0;
};

const closeStatusElement = document.querySelectorAll('.close-status');

for (let i = 0; i < closeStatusElement.length; i++) {
  closeStatusElement[i].addEventListener('click', () => {
    closeStatus();
  });
}