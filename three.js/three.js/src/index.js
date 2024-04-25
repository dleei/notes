import * as THREE from 'three';
// 创建场景
/**
 * scene参数
 * 1. fog: 雾化效果
 * 2. background: 背景颜色
 * 3. environment: 环境贴图
 * 4. overrideMaterial: 覆盖材质
 * 5. autoUpdate: 是否自动更新场景
 * 6. matrixAutoUpdate: 是否自动更新场景的矩阵
 * 7. name: 场景的名称
 * 8. userData: 用户自定义数据
 * 9. type: 场景的类型
 */

const canvas = document.querySelector('#canvas');

const scene = new THREE.Scene();

// 创建相机
/**
 * camera参数
 * 1. 视野角度（FOV）
 * 2. 长宽比（aspect）
 * 3. 近截面（near）
 * 4. 远截面（far）
 * FOV: 视野角度，单位是度，值越大，能够看到的环境越大，但是能够看到的细节就越小
 * aspect: 长宽比，表示渲染结果输出区域的横向长度和纵向长度的比值，默认值是1，表示输出区域是一个正方形
 * near: 近截面，表示从距离相机多远的位置开始渲染，一般情况都为0.1
 * far: 远截面，表示距离相机多远的位置截止渲染，如果设置的值太大会出现深度冲突（z-fighting）
 * 注意：far不能小于near
 * 注意：far和near的设置要根据实际需求来设置，如果设置的值太小，会出现渲染不完整的情况，如果设置的值太大，会出现渲染不清晰的情况
 */
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 透视相机
/**
 * 1. fov: 视野角度（FOV）
 * 2. aspect: 长宽比（aspect）
 * 3. near: 近截面（near）
 * 4. far: 远截面（far）
 * 注意：far不能小于near
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机的位置
camera.position.z = 5;
camera.position.x = 2;

// 创建几何体
/**
 * geometry参数
 * 1. width: 宽度
 * 2. height: 高度
 * 3. depth: 深度
 * 4. widthSegments: 宽度分段数
 * 5. heightSegments: 高度分段数
 * 6. depthSegments: 深度分段数
 * 7. parameters: 参数对象，用于设置几何体的属性
 * 8. uuid: 唯一标识符
 * 9. type: 类型，可以是BoxGeometry、SphereGeometry等
 */
const geometry = new THREE.BoxGeometry();

// 创建材质
/**
 * material参数
 * 1. color: 颜色
 * 2. wireframe: 是否显示几何体的线框
 * 3. transparent: 是否开启透明效果
 * 4. opacity: 透明度
 * 5. side: 渲染面片是双面还是单面，默认为正面
 * 6. depthTest: 是否开启深度检测
 * 7. depthWrite: 是否开启深度写入
 * 8. alphaTest: 开启透明度测试，只有当像素的透明度大于等于alphaTest的值时才会被渲染
 * 9. visible: 是否可见
 * 10. overdraw: 过度绘制，用于调试，表示渲染时超出的像素点数量，值越大，表示渲染时超出的像素点越多
 * 注意：transparent和opacity不能同时使用，因为transparent已经包含了opacity的功能
 */
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格
const mesh = new THREE.Mesh(geometry, material);

// 将网格添加到场景中
scene.add(mesh);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({canvas});

// 设置渲染器的尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 渲染场景
renderer.render(scene, camera);