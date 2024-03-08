function BlockySphere() {
    var canvas = document.getElementById('canvas1');

    // Create a renderer and specify the canvas as the rendering target
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Set the size of the renderer
    renderer.setSize(150, 150);
    renderer.outputColorSpace = THREE.SRGBColorSpace; // optional with post-processing

    // Create a scene
    var scene = new THREE.Scene();

    // Create a camera
    var camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.z = 5;

    // Create a cube and add it to the scene
    var geometry = new THREE.IcosahedronGeometry(3,1);

    // Create edges geometry
    var edges = new THREE.EdgesGeometry(geometry);

    // Create mesh line geometry
    var line = new MeshLine();
    line.setGeometry(edges);

    // Create material for mesh line
    var material = new MeshLineMaterial({ color: new THREE.Color(0x74ff33), lineWidth: 0.1 });

    // Create mesh line object
    var wireframe = new THREE.Mesh(line.geometry, material);


    scene.add(wireframe);
    renderer.setClearColor(0x000000, 0);

    // Render the scene
    function animate() {
        requestAnimationFrame(animate);
        wireframe.rotation.x += 0.01;
        wireframe.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

BlockySphere();
