import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/GLTFLoader.js';

// Сцена
const scene = new THREE.Scene()

// Свет
const ambientLight = new THREE.AmbientLight('white', 0.25)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight('white', 1)
dirLight.position.set(-6, 6, 6)
scene.add(dirLight)

const pointLight = new THREE.PointLight('white', 10, 50)
pointLight.position.set(-2, 6, 2)
scene.add(pointLight)

// Камера
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-40, 20, 20)

// Рендер
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Движение камеры
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 2
controls.maxDistance = 100

// 3D сетка с координатами (GridHelper)
const gridHelper = new THREE.GridHelper(100, 20)
scene.add(gridHelper)

// Оси X, Y, Z (AxesHelper)
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// 3D модели
const loader = new GLTFLoader()
const scale = [0.05, 0.05, 0.05]
const multiplier = 0.05
const rotation = [Math.PI / 2, 0, 0] // Поворот на 90 градусов вокруг оси Y
const models = []

const modelData = [
    { path: 'models/detal/kreplenie.gltf', position: [-25.5, 78, -32.032], scale, rotation, additionalRotation: [0, 0, 0], color: 0x009900CC },
    { path: 'models/detal/m4x40.gltf', position: [-8.5, 10, -23.248], scale, rotation, additionalRotation: [0, 0, Math.PI], color: 0x00FF6600 },
    { path: 'models/detal/m4x40.gltf', position: [-8.5, 95, -23.248], scale, rotation, additionalRotation: [0, 0, Math.PI], color: 0x00FF6600 }, 
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 10, -23.048], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 95, -23.048], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 10, -19.632], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 95, -19.632], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/tenzo.gltf', position: [8.5, -7, -21.832], scale, rotation, additionalRotation: [0, Math.PI / 2, 0], color: 0x0099FF00 },
    { path: 'models/detal/tenzo.gltf', position: [8.5, 78, -21.832], scale, rotation, additionalRotation: [0, Math.PI / 2, 0], color: 0x0099FF00 },
    { path: 'models/detal/pruzina.gltf', position: [-8.5, 10, -18.416], scale, rotation, additionalRotation: [0, 0, 0], color: 0x000066FF },
    { path: 'models/detal/pruzina.gltf', position: [-8.5, 95, -18.416], scale, rotation, additionalRotation: [0, 0, 0], color: 0x000066FF },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 10, 1.785], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 95, 1.784], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/m4x20.gltf', position: [-8.5, 59, -1.416], scale, rotation, additionalRotation: [0, 0, Math.PI], color: 0x00FF6600 },
    { path: 'models/detal/m4x20.gltf', position: [-8.5, 77, -1.416], scale, rotation, additionalRotation: [0, 0, Math.PI], color: 0x00FF6600 },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 59, -1.216], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 77, -1.216], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/krovat.gltf', position: [0, 0, 0], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff6347 },
    { path: 'models/detal/zazim.gltf', position: [0, 105, 8.7], scale, rotation, additionalRotation: [0, Math.PI, 0], color: 0x40e0d0 },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 10, 12.9], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 59, 12.9], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 77, 12.9], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/shaiba.gltf', position: [-8.5, 95, 12.9], scale, rotation, additionalRotation: [0, 0, 0], color: 0xff00ff },
    { path: 'models/detal/m4.gltf', position: [-8.5, 10, 14.116], scale, rotation, additionalRotation: [0, 0, 0], color: 0x7fff00 },
    { path: 'models/detal/m4.gltf', position: [-8.5, 59, 14.116], scale, rotation, additionalRotation: [0, 0, 0], color: 0x7fff00 },
    { path: 'models/detal/m4.gltf', position: [-8.5, 77, 14.116], scale, rotation, additionalRotation: [0, 0, 0], color: 0x7fff00 },
    { path: 'models/detal/m4.gltf', position: [-8.5, 95, 14.116], scale, rotation, additionalRotation: [0, 0, 0], color: 0x7fff00 }
]
let minX = Math.min(...modelData.map(data => data.position[0]))

// Загружаем и применяем поворот и цвет
modelData.forEach(({ path, position, scale, rotation, additionalRotation, color }) => {
    loader.load(path, (gltf) => {
        const model = gltf.scene
        // Применяем домножение позиции
        const adjustedPosition = position.map(val => val * multiplier)
        model.scale.set(...scale)
        model.position.set(...adjustedPosition)
        // Применяем основной и дополнительный поворот
        model.rotation.set(
            rotation[0] + additionalRotation[0],
            rotation[1] + additionalRotation[1],
            rotation[2] + additionalRotation[2]
        )
        // Применяем цвет
        model.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color)
            }
        })
        model.userData.originalZ = position[2] * multiplier
        scene.add(model)
        models.push(model)
    })
})

// Функция для округления значения до заданной точности
function roundToPrecision(value, precision = 2) {
    const factor = Math.pow(10, precision)
    return Math.round(value * factor) / factor
}

// Обработчик события для ползунка
slider.addEventListener('input', () => {
    const value = parseFloat(slider.value)

    // Сортируем модели по округленному значению Z
    models.sort((a, b) => a.userData.originalZ - b.userData.originalZ)

    // Группируем модели с одинаковыми или схожими значениями Z
    const groups = []
    models.forEach(model => {
        const roundedZ = roundToPrecision(model.userData.originalZ) // Округляем Z
        const group = groups.find(g => roundToPrecision(g[0].userData.originalZ) === roundedZ)
        if (group) {
            group.push(model)
        } else {
            groups.push([model])
        }
    })

    // Двигаем модели, учитывая группы
    let previousMaxZ = -Infinity
    groups.forEach(group => {
        // Для каждой группы устанавливаем одинаковое значение Z
        group.forEach(model => {
            model.position.z = Math.max(model.userData.originalZ, previousMaxZ + value)
        })

        // Обновляем previousMaxZ, чтобы следующая группа начиналась с максимального Z из текущей
        previousMaxZ = group[group.length - 1].position.z
    })
})

const dismantleButton = document.getElementById("dismantleButton")
const assembleButton = document.getElementById("assembleButton")

let dismantleStep = 0
let assembleStep = 0
let modelGroups = []
let minZ = Infinity // Минимальный Z среди всех моделей

// Функция для группировки моделей по Z
function groupModelsByZ() {
    const groups = {}
    models.forEach(model => {
        const roundedZ = roundToPrecision(model.userData.originalZ)
        if (!groups[roundedZ]) {
            groups[roundedZ] = []
        }
        groups[roundedZ].push(model)

        // Определяем минимальный Z
        if (model.userData.originalZ < minZ) {
            minZ = model.userData.originalZ
        }
    })

    modelGroups = Object.values(groups).sort((a, b) => b[0].userData.originalZ - a[0].userData.originalZ)
}

// Загружаем модели и сохраняем Z
modelData.forEach(({ path, position, scale, rotation, additionalRotation, color }) => {
    loader.load(path, (gltf) => {
        const model = gltf.scene
        const adjustedPosition = position.map(val => val * multiplier)
        model.scale.set(...scale)
        model.position.set(...adjustedPosition)
        model.rotation.set(
            rotation[0] + additionalRotation[0],
            rotation[1] + additionalRotation[1],
            rotation[2] + additionalRotation[2]
        );
        model.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color)
            }
        });

        model.userData.originalZ = adjustedPosition[2] // Сохраняем оригинальный Z
        scene.add(model)
        models.push(model)
        groupModelsByZ() // Пересобираем группы после загрузки
    });
});

// Разобрать модель (движение вверх)
function dismantleModel() {
    if (dismantleStep < modelGroups.length) {
        let allAboveMinZ = true // Проверяем, все ли выше минимального Z

        for (let i = 0; i <= dismantleStep; i++) {
            modelGroups[i].forEach(model => {
                if (model.position.z <= minZ) {
                    allAboveMinZ = false // Если хотя бы одна деталь на минимальном Z, дальше не двигаем
                }
            })
        }

        if (allAboveMinZ) {
            for (let i = 0; i <= dismantleStep; i++) {
                modelGroups[i].forEach(model => model.position.z += 2.5)
            }
            dismantleStep++
            assembleStep = dismantleStep // Обновляем шаг сборки
        }
    }
}

// Собрать модель (движение вниз)
function assembleModel() {
    if (assembleStep > 0) {
        assembleStep--
        for (let i = 0; i <= assembleStep; i++) {
            modelGroups[i].forEach(model => {
                // Двигаем только если результат не окажется ниже minZ
                if (model.position.z - 2.5 >= minZ) {
                    model.position.z -= 2.5
                }
            })
        }
        dismantleStep = assembleStep // Обновляем шаг разборки
    }
}

dismantleButton.addEventListener('click', dismantleModel)
assembleButton.addEventListener('click', assembleModel)

const resetButton = document.getElementById("resetButton")


// Функция для сброса всех моделей
function resetModels() {
    // Сбросить позицию модели на оригинальное значение Z
    models.forEach(model => {
        model.position.z = model.userData.originalZ
    })

    // Сбросить шаги разборки и сборки
    dismantleStep = 0
    assembleStep = 0
    modelGroups = [] // Очистить группы моделей
    groupModelsByZ() // Пересобрать группы после сброса

    // Сбросить значение ползунка на 0
    slider.value = 0
}

// Добавляем обработчик события на кнопку сброса
resetButton.addEventListener('click', resetModels)


function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.setClearColor('#E0FFFF')
    renderer.render(scene, camera)
}

animate()
