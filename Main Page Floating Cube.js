
var colorr = (115/255, 255/255, 1/255);
var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var InitDemo = function () {
	console.log('This is working');

	var canvas = document.getElementById("canvas");
	var gl = canvas.getContext('webgl', { alpha:true });

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl', { alpha:true });
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	//
	// Create shaders
	// 
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	//
	// Create buffer
	//
    var boxSize = 1.8; // Size of the box
    var boxColor = [115/255, 255/255, 1/255]; // Color of the box
    
    var boxVertices = [
        // Top
        -boxSize, boxSize, -boxSize,   boxColor[0], boxColor[1], boxColor[2],
        -boxSize, boxSize, boxSize,    boxColor[0], boxColor[1], boxColor[2],
        boxSize, boxSize, boxSize,     boxColor[0], boxColor[1], boxColor[2],
        boxSize, boxSize, -boxSize,    boxColor[0], boxColor[1], boxColor[2],
    
        // Left
        -boxSize, boxSize, boxSize,    boxColor[0], boxColor[1], boxColor[2],
        -boxSize, -boxSize, boxSize,   boxColor[0], boxColor[1], boxColor[2],
        -boxSize, -boxSize, -boxSize,  boxColor[0], boxColor[1], boxColor[2],
        -boxSize, boxSize, -boxSize,   boxColor[0], boxColor[1], boxColor[2],
    
        // Right
        boxSize, boxSize, boxSize,     boxColor[0], boxColor[1], boxColor[2],
        boxSize, -boxSize, boxSize,    boxColor[0], boxColor[1], boxColor[2],
        boxSize, -boxSize, -boxSize,   boxColor[0], boxColor[1], boxColor[2],
        boxSize, boxSize, -boxSize,    boxColor[0], boxColor[1], boxColor[2],
    
        // Front
        boxSize, boxSize, boxSize,     boxColor[0], boxColor[1], boxColor[2],
        boxSize, -boxSize, boxSize,    boxColor[0], boxColor[1], boxColor[2],
        -boxSize, -boxSize, boxSize,   boxColor[0], boxColor[1], boxColor[2],
        -boxSize, boxSize, boxSize,    boxColor[0], boxColor[1], boxColor[2],
    
        // Back
        boxSize, boxSize, -boxSize,    boxColor[0], boxColor[1], boxColor[2],
        boxSize, -boxSize, -boxSize,   boxColor[0], boxColor[1], boxColor[2],
        -boxSize, -boxSize, -boxSize,  boxColor[0], boxColor[1], boxColor[2],
        -boxSize, boxSize, -boxSize,   boxColor[0], boxColor[1], boxColor[2],
    
        // Bottom
        -boxSize, -boxSize, -boxSize,  boxColor[0], boxColor[1], boxColor[2],
        -boxSize, -boxSize, boxSize,   boxColor[0], boxColor[1], boxColor[2],
        boxSize, -boxSize, boxSize,    boxColor[0], boxColor[1], boxColor[2],
        boxSize, -boxSize, -boxSize,   boxColor[0], boxColor[1], boxColor[2]
    ];
    


    var boxIndices =
    [
        // Lines for the edges of the box
        // Top
        0, 1,
        1, 2,
        2, 3,
        3, 0,
    
        // Bottom
        4, 5,
        5, 6,
        6, 7,
        7, 4,
    
        // Left
        1, 4,
        1, 5,
        2, 6,
        3, 7,
    
        // Right
        9, 9,
        9, 10,
        10, 11,
        11, 8,
    
        // Front
        12, 13,
        13, 14,
        14, 15,
        15, 12,
        
        // Back
        17, 17,
        17, 18,
        18, 19,
        19, 16
    ];
    
    




	var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	// Tell OpenGL state machine which program should be active.
	gl.useProgram(program);

	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);

	//
	// Main render loop
	//
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;
	var loop = function () {
		angle = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
		mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
		mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.lineWidth(4.0);
		gl.drawElements(gl.LINES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
        

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};