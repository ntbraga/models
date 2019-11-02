const path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    ts = require('gulp-typescript');

const removeDir = async (dir) => {
    if (fs.existsSync(dir)) {
        await Promise.all(fs.readdirSync(dir).map(async (file, index) => {
            const curPath = path.join(dir, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                await removeDir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        }));
        fs.rmdirSync(dir);
    }
};

const streamAsPromise = async (readable) => {
    return await new Promise((resolve, reject) => {
        readable.on('finish', resolve)
        readable.on('error', reject)
    });
}


String.prototype.capitalize = function () {
    if(!this) return '';
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const build = async () => {
    const modelsPath = path.resolve(__dirname, 'dist');
    await removeDir(modelsPath);
    const tsProject = ts.createProject('tsconfig.json');
    return await streamAsPromise(tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist')));
}

const createModelsIndex = async () => {
    const modelsPath = path.resolve(__dirname, 'dist', 'models');

    const models = fs.readdirSync(modelsPath).map((file) => path.resolve(modelsPath, file));

    for (let model of models) {
        const m = await require(model);
        console.log(Object.keys(m));

        console.log(m.default.modelName.capitalize());
    }

    return {};
}

exports.default = gulp.series(build, createModelsIndex);