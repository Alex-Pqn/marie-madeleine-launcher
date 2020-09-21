
const timeoutStatus = 200

//RAM 

storeRam = (getMinRam, getMaxRam, test) => {
    const inputMinRam = document.getElementById('min-ram');
    const inputMaxRam = document.getElementById('max-ram');

    const paragraphStatusRam = document.getElementById('status-ram');
    const closeTextStatusRam = document.getElementById('close-status-ram');
    const containerStatusRam = document.getElementById('container-status-ram');

    let defaultMaxRam = 3584;
    let defaultMinRam = 2048;

    inputMinRam.value = getMinRam
    inputMaxRam.value = getMaxRam
    
    displayStatusRam = (value, background, color) => {
        closeStatusJvm()

        containerStatusRam.style.height = 0
        containerStatusRam.style.opacity = 0

        setTimeout(() => {
            containerStatusRam.style.height = "auto"
            containerStatusRam.style.opacity = 1
            containerStatusRam.style.backgroundColor = background;
        
            paragraphStatusRam.innerHTML = value;
            paragraphStatusRam.style.padding = '3px 8px';
            paragraphStatusRam.style.color = color;
        
            closeTextStatusRam.innerHTML = '×';
            closeTextStatusRam.style.color = color;
        
            document.getElementById('close-status-ram').addEventListener('click', () => {
                closeStatusRam();
            })
        }, timeoutStatus);
    }

    closeStatusRam = () => {
        containerStatusRam.style.height = 0
        containerStatusRam.style.opacity = 0
    }

    if (getMinRam === undefined) {
        storeSet('minecraftOptionMinRam', defaultMinRam)
        inputMinRam.value = defaultMinRam
    }if (getMaxRam === undefined) {
        storeSet('minecraftOptionMaxRam', defaultMaxRam)
        inputMaxRam.value = defaultMaxRam
    }

    document.getElementById('button-reset-ram').addEventListener('click', () => {
        storeSet('minecraftOptionMinRam', defaultMinRam)
        storeSet('minecraftOptionMaxRam', defaultMaxRam)
        inputMinRam.value = defaultMinRam
        inputMaxRam.value = defaultMaxRam
        displayStatusRam('Les valeurs ont bien été remises par défaut.', 'rgb(197, 95, 0)', 'white')
    })

    document.getElementById('button-save-ram').addEventListener('click', () => {
        storeSet('minecraftOptionMinRam', Math.floor(inputMinRam.value))
        storeSet('minecraftOptionMaxRam', Math.floor(inputMaxRam.value))

        if (inputMinRam.value == '' || parseInt(inputMinRam.value) < defaultMinRam) {
            storeSet('minecraftOptionMinRam', defaultMinRam)
        }
        if (inputMaxRam.value == '' || parseInt(inputMaxRam.value) < defaultMaxRam) {
            storeSet('minecraftOptionMaxRam', defaultMaxRam)
        }
        if (inputMinRam.value == '' || parseInt(inputMinRam.value) < defaultMinRam) {
            displayStatusRam('Min. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (' + defaultMinRam + ' Mo).', 'rgb(122, 0, 0)', 'white')
        }else if (inputMaxRam.value == '' || parseInt(inputMaxRam.value) < defaultMaxRam) {
            displayStatusRam('Max. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (' + defaultMaxRam + ' Mo).', 'rgb(122, 0, 0)', 'white')
        }else{
            displayStatusRam('Les changements ont bien été pris en compte.', 'rgb(0, 80, 0)', 'white')
        }
    })
}


//JVM

storeJvm = (getJvm) => {
    const containerStatusJvm = document.getElementById('container-status-jvm');
    const paragraphStatusJvm = document.getElementById('status-jvm');
    const closeTextStatusJvm = document.getElementById('close-status-jvm');
    
    let inputJvm = document.getElementById('jvm');
    
    let defaultJvm = [];
    
    const maxLengthJvm = 500
    
    inputJvm.value = getJvm
    
    displayStatusJvm = (value, background, color) => {
        closeStatusRam()
    
        containerStatusJvm.style.height = 0
        containerStatusJvm.style.opacity = 0
    
        setTimeout(() => {
            containerStatusJvm.style.height = "auto"
            containerStatusJvm.style.opacity = 1
            containerStatusJvm.style.backgroundColor = background;
        
            paragraphStatusJvm.innerHTML = value;
            paragraphStatusJvm.style.padding = '3px 8px';
            paragraphStatusJvm.style.color = color;
        
            closeTextStatusJvm.innerHTML = '×';
            closeTextStatusJvm.style.color = color;
        
            document.getElementById('close-status-jvm').addEventListener('click', () => {
                closeStatusJvm();
            })
        }, timeoutStatus);
    }
    
    closeStatusJvm = () => {
        containerStatusJvm.style.height = 0
        containerStatusJvm.style.opacity = 0
    }
    
    if (getJvm === undefined) {
        storeSet('minecraftOptionJvm', defaultJvm)
        
        inputJvm.value = defaultJvm
    }
    
    document.getElementById('button-reset-jvm').addEventListener('click', () => {
        storeSet('minecraftOptionJvm', defaultJvm);
        inputJvm.value = defaultJvm
        displayStatusJvm('Les valeurs ont bien été remises par défaut.', 'rgb(197, 95, 0)', 'white')
    })
    
    document.getElementById('button-save-jvm').addEventListener('click', () => {
        storeSet('minecraftOptionJvm', [inputJvm.value]);
    
        if (inputJvm.value.length > maxLengthJvm) {
            storeSet('minecraftOptionJvm', defaultJvm);
            displayStatusJvm('Vous ne pouvez pas inscrire une valeur supérieur à ' + maxLengthJvm + ' caractères.', 'rgb(122, 0, 0)', 'white')
        }else if (inputJvm.value.length === 0) {
            storeSet('minecraftOptionJvm', defaultJvm);
            displayStatusJvm('Les changements ont bien été pris en compte.', 'rgb(0, 80, 0)', 'white')
        }else{
            displayStatusJvm('Les changements ont bien été pris en compte.', 'rgb(0, 80, 0)', 'white')
        }
    })
}