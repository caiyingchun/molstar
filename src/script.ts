/*
 * Copyright (c) 2017 molio contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

// import * as util from 'util'
import * as fs from 'fs'

import Gro from './reader/gro/parser'

//const file = '1crn.gro'
// const file = 'water.gro'
// const file = 'test.gro'
const file = 'md_1u19_trj.gro'

fs.readFile(`./examples/${file}`, 'utf8', function (err,input) {
    if (err) {
        return console.log(err);
    }
    // console.log(data);

    console.time('parse')
    const parsed = Gro(input)
    console.timeEnd('parse')
    if (parsed.isError) {
        console.log(parsed)
        return;
    }

    const groFile = parsed.result

    console.log('structure count: ', groFile.structures.length);

    const data = groFile.structures[0];

    // const header = groFile.blocks[0].getCategory('header')
    const { header, atoms } = data;
    console.log(JSON.stringify(header, null, 2));
    console.log('number of atoms:', atoms.count);

    console.log(`'${atoms.residueNumber.value(1)}'`)
    console.log(`'${atoms.residueName.value(1)}'`)
    console.log(`'${atoms.atomName.value(1)}'`)
    console.log(atoms.z.value(1))
    console.log(`'${atoms.z.value(1)}'`)

    const n = atoms.count;
    console.log('rowCount', n)

    console.time('getFloatArray x')
    const x = atoms.x.toArray(x => new Float32Array(x))!
    console.timeEnd('getFloatArray x')
    console.log(x.length, x[0], x[x.length-1])

    console.time('getFloatArray y')
    const y = atoms.y.toArray(x => new Float32Array(x))!
    console.timeEnd('getFloatArray y')
    console.log(y.length, y[0], y[y.length-1])

    console.time('getFloatArray z')
    const z = atoms.z.toArray(x => new Float32Array(x))!
    console.timeEnd('getFloatArray z')
    console.log(z.length, z[0], z[z.length-1])

    console.time('getIntArray residueNumber')
    const residueNumber = atoms.residueNumber.toArray(x => new Int32Array(x))!
    console.timeEnd('getIntArray residueNumber')
    console.log(residueNumber.length, residueNumber[0], residueNumber[residueNumber.length-1])
});
