import React, { Component } from "react";
//import ReactDOM from "react-dom";
import * as THREE from "three";

export default class Three extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.SphereBufferGeometry( .5, 64, 64 );
    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const textureLoader = new THREE.TextureLoader()

    const normalTexture = textureLoader.load('/textures/golf.png')
    var material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.normalmap = normalTexture
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    // White directional light at half intensity shining from the top.
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    const light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 50, 0, 50 );
    scene.add( light );

    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
        <>
            <h2>Three.js</h2>
            <div />
        </>
    )
  }
}
