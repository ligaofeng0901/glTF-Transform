require('source-map-support').install();

const test = require('tape');
const { Document, TextureSampler } = require('../../');

test('@gltf-transform/core::material | properties', t => {
	const doc = new Document();

	const mat = doc.createMaterial('mat')
		.setDoubleSided(true)
		.setAlphaMode('MASK')
		.setAlphaCutoff(0.33);

	t.equal(mat.getDoubleSided(), true, 'doubleSided');
	t.equal(mat.getAlphaMode(), 'MASK', 'alphaMode');
	t.equal(mat.getAlphaCutoff(), 0.33, 'alphaCutoff');
	t.end();
});

test('@gltf-transform/core::material | factors', t => {
	const doc = new Document();

	const mat = doc.createMaterial('mat')
		.setBaseColorFactor([1, 0, 0, 1])
		.setEmissiveFactor([0.5, 0.5, 0.5])
		.setMetallicFactor(0.1)
		.setRoughnessFactor(0.9);

	t.deepEqual(mat.getBaseColorFactor(), [1, 0, 0, 1], 'baseColorFactor');
	t.deepEqual(mat.getEmissiveFactor(), [0.5, 0.5, 0.5], 'emissiveFactor');
	t.equal(mat.getMetallicFactor(), 0.1, 'metallicFactor');
	t.equal(mat.getRoughnessFactor(), 0.9, 'roughnessFactor');
	t.end();
});

test('@gltf-transform/core::material | textures', t => {
	const doc = new Document();

	const baseColor = doc.createTexture('baseColor');
	const emissive = doc.createTexture('emissive');
	const normal = doc.createTexture('normal');
	const metalRough = doc.createTexture('metalRough');
	const occlusion = doc.createTexture('occlusion');

	const mat = doc.createMaterial('mat')
		.setBaseColorTexture(baseColor)
		.setEmissiveTexture(emissive)
		.setNormalTexture(normal)
		.setNormalScale(0.85)
		.setMetallicRoughnessTexture(metalRough)
		.setOcclusionTexture(occlusion)
		.setOcclusionStrength(0.4);

	t.equal(mat.getBaseColorTexture(), baseColor, 'baseColorTexture');
	t.equal(mat.getEmissiveTexture(), emissive, 'emissiveTexture');
	t.equal(mat.getNormalTexture(), normal, 'normalTexture');
	t.equal(mat.getNormalScale(), 0.85, 'normalTexture.scale');
	t.equal(mat.getMetallicRoughnessTexture(), metalRough, 'metallicRoughnessTexture');
	t.equal(mat.getOcclusionTexture(), occlusion, 'occlusionTexture');
	t.equal(mat.getOcclusionStrength(), 0.4, 'occlusionTexture.strength');
	t.end();
});

test('@gltf-transform/core::material | texture samplers', t => {
	const doc = new Document();

	const mat = doc.createMaterial('mat');
	const baseColor = doc.createTexture('baseColor');
	const emissive = doc.createTexture('emissive');

	t.equal(mat.getBaseColorTextureSampler(), null, 'default baseColorTexture sampler');
	t.equal(mat.getEmissiveTextureSampler(), null, 'default emissiveTexture sampler');
	t.equal(mat.getNormalTextureSampler(), null, 'default normalTexture sampler');
	t.equal(mat.getMetallicRoughnessTextureSampler(), null, 'default metallicRoughnessTexture sampler');
	t.equal(mat.getOcclusionTextureSampler(), null, 'default occlusionTexture sampler');

	mat.setBaseColorTexture(baseColor)
		.getBaseColorTextureSampler()
		.setWrapS(TextureSampler.TextureWrapMode.REPEAT)
		.setWrapT(TextureSampler.TextureWrapMode.CLAMP_TO_EDGE);

	mat.setEmissiveTexture(emissive)
		.getEmissiveTextureSampler()
		.setMinFilter(TextureSampler.TextureMinFilter.LINEAR)
		.setMagFilter(TextureSampler.TextureMagFilter.NEAREST);

	t.equal(mat.getBaseColorTextureSampler().getWrapS(), TextureSampler.TextureWrapMode.REPEAT, 'wrapS');
	t.equal(mat.getBaseColorTextureSampler().getWrapT(), TextureSampler.TextureWrapMode.CLAMP_TO_EDGE, 'wrapT');
	t.equal(mat.getEmissiveTextureSampler().getMinFilter(), TextureSampler.TextureMinFilter.LINEAR, 'minFilter');
	t.equal(mat.getEmissiveTextureSampler().getMagFilter(), TextureSampler.TextureMinFilter.NEAREST, 'magFilter');
	t.equal(mat.getNormalTextureSampler(), null, 'unchanged normalTexture sampler');
	t.equal(mat.getMetallicRoughnessTextureSampler(), null, 'unchanged metallicRoughnessTexture sampler');
	t.equal(mat.getOcclusionTextureSampler(), null, 'unchanged occlusionTexture sampler');
	t.end();
});

test('@gltf-transform/core::material | texture info', t => {
	const doc = new Document();

	const mat = doc.createMaterial('mat');
	const baseColor = doc.createTexture('baseColor');
	const emissive = doc.createTexture('emissive');

	t.equal(mat.getBaseColorTextureInfo(), null, 'default baseColorTexture info');
	t.equal(mat.getEmissiveTextureInfo(), null, 'default emissiveTexture info');
	t.equal(mat.getNormalTextureInfo(), null, 'default normalTexture info');
	t.equal(mat.getMetallicRoughnessTextureInfo(), null, 'default metallicRoughnessTexture info');
	t.equal(mat.getOcclusionTextureInfo(), null, 'default occlusionTexture info');

	mat.setBaseColorTexture(baseColor)
		.getBaseColorTextureInfo()
		.setTexCoord(0);

	mat.setEmissiveTexture(emissive)
		.getEmissiveTextureInfo()
		.setTexCoord(1);

	t.equal(mat.getBaseColorTextureInfo().getTexCoord(), 0, 'baseColorTexture.texCoord');
	t.equal(mat.getEmissiveTextureInfo().getTexCoord(), 1, 'emissiveTexture.texCoord');
	t.equal(mat.getNormalTextureInfo(), null, 'unchanged normalTexture info');
	t.equal(mat.getMetallicRoughnessTextureInfo(), null, 'unchanged metallicRoughnessTexture info');
	t.equal(mat.getOcclusionTextureInfo(), null, 'unchanged occlusionTexture info');
	t.end();
});

test('@gltf-transform/core::material | texture linking', t => {
	const doc = new Document();

	const tex1 = doc.createTexture('tex1');
	const tex2 = doc.createTexture('tex2');
	const tex3 = doc.createTexture('tex3');

	const mat = doc.createMaterial('mat');

	const toType = (p) => p.propertyType;

	mat.setBaseColorTexture(tex1);
	t.equals(mat.getBaseColorTexture(), tex1, 'sets baseColorTexture');
	t.deepEqual(tex1.listParents().map(toType), ['Root', 'Material'], 'links baseColorTexture')

	mat.setNormalTexture(tex2);
	t.equals(mat.getNormalTexture(), tex2, 'sets normalTexture');
	t.deepEqual(tex1.listParents().map(toType), ['Root', 'Material'], 'links normalTexture')
	t.deepEqual(tex2.listParents().map(toType), ['Root', 'Material'], 'links normalTexture')

	mat.setBaseColorTexture(tex3);
	t.equals(mat.getBaseColorTexture(), tex3, 'overwrites baseColorTexture');
	t.deepEqual(tex1.listParents().map(toType), ['Root'], 'unlinks old baseColorTexture');
	t.deepEqual(tex3.listParents().map(toType), ['Root', 'Material'], 'links new baseColorTexture');

	mat.setBaseColorTexture(null);
	t.equals(mat.getBaseColorTexture(), null, 'deletes baseColorTexture');
	t.deepEqual(tex3.listParents().map(toType), ['Root'], 'unlinks old baseColorTexture');

	t.end();
});
