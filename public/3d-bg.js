document.addEventListener('DOMContentLoaded', () => {
    // Remove the old canvas if it exists
    const oldCanvas = document.getElementById('bg-canvas');
    if (oldCanvas) oldCanvas.remove();
    const oldMeshBg = document.querySelector('.mesh-bg');
    if (oldMeshBg) oldMeshBg.remove();
    const oldGrid = document.querySelector('.grid-overlay');
    if (oldGrid) oldGrid.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);

    const scene = new THREE.Scene();
    scene.background = null; // transparent background so CSS color shows through

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const shapes = [];
    const colors = [0xE81A76, 0x00A7A5, 0xC0D72F, 0x000000]; // Magenta, Cyan, Lime, Black

    // Generate 60 floating flat geometric shards
    for (let i = 0; i < 60; i++) {
        const type = Math.floor(Math.random() * 3);
        const size = Math.random() * 8 + 4;
        
        let geometry;
        if (type === 0) geometry = new THREE.BoxGeometry(size, size, size); // Cubes
        else if (type === 1) geometry = new THREE.PlaneGeometry(size * 2, size * 2); // Squares/Rectangles
        else geometry = new THREE.ConeGeometry(size, size*2, 3); // Triangles/Pyramids

        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Critical for abstract flat look: BasicMaterial avoids lighting gradients, making 3D objects look 2D
        const material = new THREE.MeshBasicMaterial({ 
            color: color, 
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 200;
        mesh.position.y = (Math.random() - 0.5) * 200;
        mesh.position.z = (Math.random() - 0.5) * 150 - 25;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        const rotSpeedX = (Math.random() - 0.5) * 0.02;
        const rotSpeedY = (Math.random() - 0.5) * 0.02;
        
        let speedY = (Math.random() - 0.5) * 0.15;
        if (speedY < 0.05 && speedY > -0.05) speedY = 0.08;

        let speedX = (Math.random() - 0.5) * 0.05;

        shapes.push({ mesh, rotSpeedX, rotSpeedY, speedY, speedX });
        scene.add(mesh);
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotSpeedX;
            shape.mesh.rotation.y += shape.rotSpeedY;
            
            shape.mesh.position.y += shape.speedY;
            shape.mesh.position.x += shape.speedX;

            if (shape.mesh.position.y > 120) shape.mesh.position.y = -120;
            if (shape.mesh.position.y < -120) shape.mesh.position.y = 120;
            if (shape.mesh.position.x > 150) shape.mesh.position.x = -150;
            if (shape.mesh.position.x < -150) shape.mesh.position.x = 150;
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
