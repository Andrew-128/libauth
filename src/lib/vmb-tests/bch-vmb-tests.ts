/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * See the [Libauth VMB Tests Readme](./readme.md) for background information on
 * VMB tests.
 *
 * Below is the source data structure used to generate the Libauth Bitcoin Cash
 * (BCH) Virtual Machine Bytecode (VMB) tests (`bch_vmb_tests.json` and all
 * `bch_vmb_tests_*.json` files). Compiling from this file allows us to easily
 * 1) validate the data structure, and 2) reproducibly generate artifacts like
 * public keys, hashes, and signatures.
 *
 * To add tests to this file:
 *  1. Clone the Libauth repo and install dependencies using `yarn install`.
 *  2. Add the new tests below.
 *  3. Run `yarn gen:tests` to regenerate all test vectors.
 *  5. Run `yarn test` to ensure everything is working, then send your PR.
 *
 * Note: for performance reasons, this file is not exported by the library, but
 * it can still be directly imported.
 */

import type { VmbTestDefinitionGroup } from '../lib';
import { bigIntToBinUint64LE, binToHex, cashAssemblyToBin, hashTransactionUiOrder, hexToBin, range } from '../lib.js';

import { slot0Scenario, slot2Scenario, slot9Scenario } from './bch-vmb-test-mixins.js';
import { vmbTestGroupToVmbTests } from './bch-vmb-test-utils.js';

/**
 * The source data structure used to generate the Libauth BCH VMB test
 * vectors (`bch_vmb_tests.json` and all `bch_vmb_*_tx.json` files).
 */
export const vmbTestDefinitionsBCH: VmbTestDefinitionGroup[] = [
  [
    'Basic push operations',
    [
      ['OP_0', 'OP_SIZE <0> OP_EQUAL OP_NIP', 'OP_0 (A.K.A. OP_PUSHBYTES_0, OP_FALSE): zero is represented by an empty stack item'],
      ['OP_PUSHBYTES_1 0x00', 'OP_SIZE <1> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_1'],
      ['OP_PUSHBYTES_2 0x0000', 'OP_SIZE <2> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_2'],
      ['OP_PUSHBYTES_3 0x000000', 'OP_SIZE <3> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_3'],
      ['OP_PUSHBYTES_4 0x00000000', 'OP_SIZE <4> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_4'],
      ['OP_PUSHBYTES_5 0x0000000000', 'OP_SIZE <5> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_5'],
      ['OP_PUSHBYTES_6 0x000000000000', 'OP_SIZE <6> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_6'],
      ['OP_PUSHBYTES_7 0x00000000000000', 'OP_SIZE <7> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_7'],
      ['OP_PUSHBYTES_8 0x0000000000000000', 'OP_SIZE <8> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_8'],
      ['OP_PUSHBYTES_9 0x000000000000000000', 'OP_SIZE <9> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_9'],
      ['OP_PUSHBYTES_10 0x00000000000000000000', 'OP_SIZE <10> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_10'],
      ['OP_PUSHBYTES_11 0x0000000000000000000000', 'OP_SIZE <11> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_11'],
      ['OP_PUSHBYTES_12 0x000000000000000000000000', 'OP_SIZE <12> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_12'],
      ['OP_PUSHBYTES_13 0x00000000000000000000000000', 'OP_SIZE <13> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_13'],
      ['OP_PUSHBYTES_14 0x0000000000000000000000000000', 'OP_SIZE <14> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_14'],
      ['OP_PUSHBYTES_15 0x000000000000000000000000000000', 'OP_SIZE <15> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_15'],
      ['OP_PUSHBYTES_16 0x00000000000000000000000000000000', 'OP_SIZE <16> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_16'],
      ['OP_PUSHBYTES_17 0x0000000000000000000000000000000000', 'OP_SIZE <17> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_17'],
      ['OP_PUSHBYTES_18 0x000000000000000000000000000000000000', 'OP_SIZE <18> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_18'],
      ['OP_PUSHBYTES_19 0x00000000000000000000000000000000000000', 'OP_SIZE <19> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_19'],
      ['OP_PUSHBYTES_20 0x0000000000000000000000000000000000000000', 'OP_SIZE <20> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_20'],
      ['OP_PUSHBYTES_21 0x000000000000000000000000000000000000000000', 'OP_SIZE <21> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_21'],
      ['OP_PUSHBYTES_22 0x00000000000000000000000000000000000000000000', 'OP_SIZE <22> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_22'],
      ['OP_PUSHBYTES_23 0x0000000000000000000000000000000000000000000000', 'OP_SIZE <23> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_23'],
      ['OP_PUSHBYTES_24 0x000000000000000000000000000000000000000000000000', 'OP_SIZE <24> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_24'],
      ['OP_PUSHBYTES_25 0x00000000000000000000000000000000000000000000000000', 'OP_SIZE <25> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_25'],
      ['OP_PUSHBYTES_26 0x0000000000000000000000000000000000000000000000000000', 'OP_SIZE <26> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_26'],
      ['OP_PUSHBYTES_27 0x000000000000000000000000000000000000000000000000000000', 'OP_SIZE <27> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_27'],
      ['OP_PUSHBYTES_28 0x00000000000000000000000000000000000000000000000000000000', 'OP_SIZE <28> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_28'],
      ['OP_PUSHBYTES_29 0x0000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <29> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_29'],
      ['OP_PUSHBYTES_30 0x000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <30> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_30'],
      ['OP_PUSHBYTES_31 0x00000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <31> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_31'],
      ['OP_PUSHBYTES_32 0x0000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <32> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_32'],
      ['OP_PUSHBYTES_33 0x000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <33> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_33'],
      ['OP_PUSHBYTES_34 0x00000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <34> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_34'],
      ['OP_PUSHBYTES_35 0x0000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <35> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_35'],
      ['OP_PUSHBYTES_36 0x000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <36> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_36'],
      ['OP_PUSHBYTES_37 0x00000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <37> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_37'],
      ['OP_PUSHBYTES_38 0x0000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <38> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_38'],
      ['OP_PUSHBYTES_39 0x000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <39> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_39'],
      ['OP_PUSHBYTES_40 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <40> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_40'],
      ['OP_PUSHBYTES_41 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <41> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_41'],
      ['OP_PUSHBYTES_42 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <42> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_42'],
      ['OP_PUSHBYTES_43 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <43> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_43'],
      ['OP_PUSHBYTES_44 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <44> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_44'],
      ['OP_PUSHBYTES_45 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <45> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_45'],
      ['OP_PUSHBYTES_46 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <46> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_46'],
      ['OP_PUSHBYTES_47 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <47> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_47'],
      ['OP_PUSHBYTES_48 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <48> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_48'],
      ['OP_PUSHBYTES_49 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <49> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_49'],
      ['OP_PUSHBYTES_50 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <50> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_50'],
      ['OP_PUSHBYTES_51 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <51> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_51'],
      ['OP_PUSHBYTES_52 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <52> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_52'],
      ['OP_PUSHBYTES_53 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <53> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_53'],
      ['OP_PUSHBYTES_54 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <54> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_54'],
      ['OP_PUSHBYTES_55 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <55> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_55'],
      ['OP_PUSHBYTES_56 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <56> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_56'],
      ['OP_PUSHBYTES_57 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <57> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_57'],
      ['OP_PUSHBYTES_58 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <58> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_58'],
      ['OP_PUSHBYTES_59 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <59> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_59'],
      ['OP_PUSHBYTES_60 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <60> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_60'],
      ['OP_PUSHBYTES_61 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <61> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_61'],
      ['OP_PUSHBYTES_62 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <62> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_62'],
      ['OP_PUSHBYTES_63 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <63> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_63'],
      ['OP_PUSHBYTES_64 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <64> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_64'],
      ['OP_PUSHBYTES_65 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <65> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_65'],
      ['OP_PUSHBYTES_66 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <66> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_66'],
      ['OP_PUSHBYTES_67 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <67> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_67'],
      ['OP_PUSHBYTES_68 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <68> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_68'],
      ['OP_PUSHBYTES_69 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <69> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_69'],
      ['OP_PUSHBYTES_70 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <70> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_70'],
      ['OP_PUSHBYTES_71 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <71> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_71'],
      ['OP_PUSHBYTES_72 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <72> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_72'],
      ['OP_PUSHBYTES_73 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <73> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_73'],
      ['OP_PUSHBYTES_74 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <74> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_74'],
      ['OP_PUSHBYTES_75 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'OP_SIZE <75> OP_EQUAL OP_NIP', 'OP_PUSHBYTES_75'],
      ['OP_PUSHBYTES_1', 'OP_SIZE <1> OP_EQUAL', 'OP_PUSHBYTES_1 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_2 0x00', 'OP_SIZE <2> OP_EQUAL', 'OP_PUSHBYTES_2 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_3 0x00', 'OP_SIZE <3> OP_EQUAL', 'OP_PUSHBYTES_3 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_4 0x00', 'OP_SIZE <4> OP_EQUAL', 'OP_PUSHBYTES_4 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_5 0x00', 'OP_SIZE <5> OP_EQUAL', 'OP_PUSHBYTES_5 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_6 0x00', 'OP_SIZE <6> OP_EQUAL', 'OP_PUSHBYTES_6 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_7 0x00', 'OP_SIZE <7> OP_EQUAL', 'OP_PUSHBYTES_7 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_8 0x00', 'OP_SIZE <8> OP_EQUAL', 'OP_PUSHBYTES_8 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_9 0x00', 'OP_SIZE <9> OP_EQUAL', 'OP_PUSHBYTES_9 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_10 0x00', 'OP_SIZE <10> OP_EQUAL', 'OP_PUSHBYTES_10 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_11 0x00', 'OP_SIZE <11> OP_EQUAL', 'OP_PUSHBYTES_11 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_12 0x00', 'OP_SIZE <12> OP_EQUAL', 'OP_PUSHBYTES_12 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_13 0x00', 'OP_SIZE <13> OP_EQUAL', 'OP_PUSHBYTES_13 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_14 0x00', 'OP_SIZE <14> OP_EQUAL', 'OP_PUSHBYTES_14 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_15 0x00', 'OP_SIZE <15> OP_EQUAL', 'OP_PUSHBYTES_15 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_16 0x00', 'OP_SIZE <16> OP_EQUAL', 'OP_PUSHBYTES_16 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_17 0x00', 'OP_SIZE <17> OP_EQUAL', 'OP_PUSHBYTES_17 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_18 0x00', 'OP_SIZE <18> OP_EQUAL', 'OP_PUSHBYTES_18 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_19 0x00', 'OP_SIZE <19> OP_EQUAL', 'OP_PUSHBYTES_19 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_20 0x00', 'OP_SIZE <20> OP_EQUAL', 'OP_PUSHBYTES_20 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_21 0x00', 'OP_SIZE <21> OP_EQUAL', 'OP_PUSHBYTES_21 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_22 0x00', 'OP_SIZE <22> OP_EQUAL', 'OP_PUSHBYTES_22 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_23 0x00', 'OP_SIZE <23> OP_EQUAL', 'OP_PUSHBYTES_23 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_24 0x00', 'OP_SIZE <24> OP_EQUAL', 'OP_PUSHBYTES_24 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_25 0x00', 'OP_SIZE <25> OP_EQUAL', 'OP_PUSHBYTES_25 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_26 0x00', 'OP_SIZE <26> OP_EQUAL', 'OP_PUSHBYTES_26 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_27 0x00', 'OP_SIZE <27> OP_EQUAL', 'OP_PUSHBYTES_27 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_28 0x00', 'OP_SIZE <28> OP_EQUAL', 'OP_PUSHBYTES_28 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_29 0x00', 'OP_SIZE <29> OP_EQUAL', 'OP_PUSHBYTES_29 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_30 0x00', 'OP_SIZE <30> OP_EQUAL', 'OP_PUSHBYTES_30 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_31 0x00', 'OP_SIZE <31> OP_EQUAL', 'OP_PUSHBYTES_31 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_32 0x00', 'OP_SIZE <32> OP_EQUAL', 'OP_PUSHBYTES_32 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_33 0x00', 'OP_SIZE <33> OP_EQUAL', 'OP_PUSHBYTES_33 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_34 0x00', 'OP_SIZE <34> OP_EQUAL', 'OP_PUSHBYTES_34 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_35 0x00', 'OP_SIZE <35> OP_EQUAL', 'OP_PUSHBYTES_35 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_36 0x00', 'OP_SIZE <36> OP_EQUAL', 'OP_PUSHBYTES_36 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_37 0x00', 'OP_SIZE <37> OP_EQUAL', 'OP_PUSHBYTES_37 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_38 0x00', 'OP_SIZE <38> OP_EQUAL', 'OP_PUSHBYTES_38 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_39 0x00', 'OP_SIZE <39> OP_EQUAL', 'OP_PUSHBYTES_39 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_40 0x00', 'OP_SIZE <40> OP_EQUAL', 'OP_PUSHBYTES_40 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_41 0x00', 'OP_SIZE <41> OP_EQUAL', 'OP_PUSHBYTES_41 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_42 0x00', 'OP_SIZE <42> OP_EQUAL', 'OP_PUSHBYTES_42 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_43 0x00', 'OP_SIZE <43> OP_EQUAL', 'OP_PUSHBYTES_43 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_44 0x00', 'OP_SIZE <44> OP_EQUAL', 'OP_PUSHBYTES_44 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_45 0x00', 'OP_SIZE <45> OP_EQUAL', 'OP_PUSHBYTES_45 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_46 0x00', 'OP_SIZE <46> OP_EQUAL', 'OP_PUSHBYTES_46 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_47 0x00', 'OP_SIZE <47> OP_EQUAL', 'OP_PUSHBYTES_47 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_48 0x00', 'OP_SIZE <48> OP_EQUAL', 'OP_PUSHBYTES_48 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_49 0x00', 'OP_SIZE <49> OP_EQUAL', 'OP_PUSHBYTES_49 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_50 0x00', 'OP_SIZE <50> OP_EQUAL', 'OP_PUSHBYTES_50 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_51 0x00', 'OP_SIZE <51> OP_EQUAL', 'OP_PUSHBYTES_51 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_52 0x00', 'OP_SIZE <52> OP_EQUAL', 'OP_PUSHBYTES_52 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_53 0x00', 'OP_SIZE <53> OP_EQUAL', 'OP_PUSHBYTES_53 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_54 0x00', 'OP_SIZE <54> OP_EQUAL', 'OP_PUSHBYTES_54 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_55 0x00', 'OP_SIZE <55> OP_EQUAL', 'OP_PUSHBYTES_55 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_56 0x00', 'OP_SIZE <56> OP_EQUAL', 'OP_PUSHBYTES_56 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_57 0x00', 'OP_SIZE <57> OP_EQUAL', 'OP_PUSHBYTES_57 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_58 0x00', 'OP_SIZE <58> OP_EQUAL', 'OP_PUSHBYTES_58 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_59 0x00', 'OP_SIZE <59> OP_EQUAL', 'OP_PUSHBYTES_59 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_60 0x00', 'OP_SIZE <60> OP_EQUAL', 'OP_PUSHBYTES_60 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_61 0x00', 'OP_SIZE <61> OP_EQUAL', 'OP_PUSHBYTES_61 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_62 0x00', 'OP_SIZE <62> OP_EQUAL', 'OP_PUSHBYTES_62 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_63 0x00', 'OP_SIZE <63> OP_EQUAL', 'OP_PUSHBYTES_63 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_64 0x00', 'OP_SIZE <64> OP_EQUAL', 'OP_PUSHBYTES_64 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_65 0x00', 'OP_SIZE <65> OP_EQUAL', 'OP_PUSHBYTES_65 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_66 0x00', 'OP_SIZE <66> OP_EQUAL', 'OP_PUSHBYTES_66 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_67 0x00', 'OP_SIZE <67> OP_EQUAL', 'OP_PUSHBYTES_67 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_68 0x00', 'OP_SIZE <68> OP_EQUAL', 'OP_PUSHBYTES_68 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_69 0x00', 'OP_SIZE <69> OP_EQUAL', 'OP_PUSHBYTES_69 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_70 0x00', 'OP_SIZE <70> OP_EQUAL', 'OP_PUSHBYTES_70 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_71 0x00', 'OP_SIZE <71> OP_EQUAL', 'OP_PUSHBYTES_71 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_72 0x00', 'OP_SIZE <72> OP_EQUAL', 'OP_PUSHBYTES_72 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_73 0x00', 'OP_SIZE <73> OP_EQUAL', 'OP_PUSHBYTES_73 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_74 0x00', 'OP_SIZE <74> OP_EQUAL', 'OP_PUSHBYTES_74 with missing bytes', ['invalid']],
      ['OP_PUSHBYTES_75 0x00', 'OP_SIZE <75> OP_EQUAL', 'OP_PUSHBYTES_75 with missing bytes', ['invalid']],
    ],
  ],
  // TODO: OP_PUSHDATA_1, OP_PUSHDATA_2, OP_PUSHDATA_4

  // TODO: also test all push opcodes in locking bytecode
  [
    'Push number operations (OP_1NEGATE-OP_16)',
    [
      ['OP_1NEGATE', '<-1 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_1NEGATE pushes 0x81.'],
      ['OP_0', '<0x00> OP_CAT <0x00> OP_EQUAL', 'OP_0 pushes an empty stack item.'],
      ['OP_1', '<1 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_1 pushes 0x01.'],
      ['OP_2', '<2 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_2 pushes 0x02.'],
      ['OP_3', '<3 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_3 pushes 0x03.'],
      ['OP_4', '<4 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_4 pushes 0x04.'],
      ['OP_5', '<5 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_5 pushes 0x05.'],
      ['OP_6', '<6 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_6 pushes 0x06.'],
      ['OP_7', '<7 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_7 pushes 0x07.'],
      ['OP_8', '<8 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_8 pushes 0x08.'],
      ['OP_9', '<9 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_9 pushes 0x09.'],
      ['OP_10', '<10 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_10 pushes 0x0a.'],
      ['OP_11', '<11 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_11 pushes 0x0b.'],
      ['OP_12', '<12 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_12 pushes 0x0c.'],
      ['OP_13', '<13 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_13 pushes 0x0d.'],
      ['OP_14', '<14 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_14 pushes 0x0e.'],
      ['OP_15', '<15 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_15 pushes 0x0f.'],
      ['OP_16', '<16 0x00> <1> OP_SPLIT OP_DROP OP_EQUAL', 'OP_16 pushes 0x10.'],
    ],
  ],
  [
    'Standard and P2SH transaction inputs may only include push operations',
    [
      ['<0> OP_IF OP_RESERVED OP_ENDIF', '<1>', 'OP_RESERVED is valid if not executed (and is standard in unlocking bytecode, but OP_IF/OP_ENDIF are not)', ['valid', 'p2sh_invalid']],
      ['<1> OP_IF OP_RESERVED OP_ENDIF', '<1>', 'OP_RESERVED is only valid if not executed (and is standard in unlocking bytecode, but OP_IF/OP_ENDIF are not)', ['invalid']],
      ['OP_NOP', '<1>', 'OP_NOP is non-standard in unlocking bytecode', ['valid', 'p2sh_invalid']],
      // TODO: ensure all non-push opcodes are non-standard when found in unlocking bytecode
    ],
  ],
  [
    'Disabled/failing operations',
    [
      // TODO: all OP_UNKNOWNs
      ['<0>', 'OP_IF OP_RESERVED OP_ENDIF <1>', 'OP_RESERVED is standard if not executed', []],
      ['<1>', 'OP_IF OP_RESERVED OP_ENDIF <1>', 'OP_RESERVED fails evaluation if executed', ['invalid']],
      ['<0>', 'OP_IF OP_VER OP_ENDIF <1>', 'OP_VER is standard if not executed', []],
      ['<1>', 'OP_IF OP_VER OP_ENDIF <1>', 'OP_VER fails evaluation if executed', ['invalid']],
      ['<0>', 'OP_IF OP_VERIF OP_ENDIF <1>', 'OP_VERIF fails evaluation even if not executed', ['invalid']],
      ['<0>', 'OP_IF OP_VERNOTIF OP_ENDIF <1>', 'OP_VERNOTIF fails evaluation even if not executed', ['invalid']],
      ['<0>', 'OP_IF OP_RETURN OP_ENDIF <1>', 'OP_RETURN is standard if not executed', []],
      ['<1>', 'OP_IF OP_RETURN OP_ENDIF <1>', 'OP_RETURN fails evaluation if executed', ['invalid']],
      ['<0>', 'OP_IF OP_INVERT OP_ENDIF <1>', 'OP_INVERT fails evaluation even if not executed', ['invalid']],
      ['<0>', 'OP_IF OP_RESERVED1 OP_ENDIF <1>', 'OP_RESERVED1 is standard if not executed', []],
      ['<1>', 'OP_IF OP_RESERVED1 OP_ENDIF <1>', 'OP_RESERVED1 fails evaluation if executed', ['invalid']],
      ['<0>', 'OP_IF OP_RESERVED2 OP_ENDIF <1>', 'OP_RESERVED2 is standard if not executed', []],
      ['<1>', 'OP_IF OP_RESERVED2 OP_ENDIF <1>', 'OP_RESERVED2 fails evaluation if executed', ['invalid']],
      ['<0>', 'OP_IF OP_2MUL OP_ENDIF <1>', 'OP_2MUL fails evaluation even if not executed', ['invalid']],
      ['<0>', 'OP_IF OP_2DIV OP_ENDIF <1>', 'OP_2DIV fails evaluation even if not executed', ['invalid']],
      ['<0>', 'OP_IF OP_LSHIFT OP_ENDIF <1>', 'OP_LSHIFT fails evaluation even if not executed', ['invalid']],
      ['<0>', 'OP_IF OP_RSHIFT OP_ENDIF <1>', 'OP_RSHIFT fails evaluation even if not executed', ['invalid']],
    ],
  ],
  [
    'OP_NOP1-OP_NOP10 expansion range',
    [
      ['<1>', 'OP_NOP1', 'OP_NOP1 is non-standard', ['valid']],
      ['<1>', 'OP_NOP4', 'OP_NOP4 is non-standard', ['valid']],
      ['<1>', 'OP_NOP5', 'OP_NOP5 is non-standard', ['valid']],
      ['<1>', 'OP_NOP6', 'OP_NOP6 is non-standard', ['valid']],
      ['<1>', 'OP_NOP7', 'OP_NOP7 is non-standard', ['valid']],
      ['<1>', 'OP_NOP8', 'OP_NOP8 is non-standard', ['valid']],
      ['<1>', 'OP_NOP9', 'OP_NOP9 is non-standard', ['valid']],
      ['<1>', 'OP_NOP10', 'OP_NOP10 is non-standard', ['valid']],
    ],
  ],
  [
    'Conditionals',
    [
      ['<0>', 'OP_IF <0> OP_ENDIF <1>', 'OP_IF'],
      ['<1>', 'OP_NOTIF <0> OP_ENDIF <1>', 'OP_NOTIF'],
      ['<0> OP_IF', '<1>', 'Unbalanced OP_IF in unlocking bytecode', ['invalid']],
      ['<0> OP_IF', 'OP_ENDIF <1>', 'Unbalanced OP_IF, must OP_ENDIF in active bytecode', ['invalid']],
      ['<1> ', 'OP_IF <1>', 'Unbalanced OP_IF in locking bytecode', ['invalid']],
      ['<0> OP_NOTIF', '<1>', 'Unbalanced OP_NOTIF in unlocking bytecode', ['invalid']],
      ['<0> OP_NOTIF', 'OP_ENDIF <1>', 'Unbalanced OP_NOTIF, must OP_ENDIF in active bytecode', ['invalid']],
      ['<1> ', 'OP_NOTIF <1>', 'Unbalanced OP_NOTIF in locking bytecode', ['invalid']],
    ],
  ],
  [
    'Conditionally executed operations',
    [
      // TODO: all other conditional operations
      ['<0>', 'OP_IF OP_INPUTINDEX OP_ENDIF OP_INPUTINDEX OP_INPUTINDEX OP_EQUAL', 'OP_INPUTINDEX is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF OP_ACTIVEBYTECODE OP_ENDIF OP_ACTIVEBYTECODE OP_ACTIVEBYTECODE OP_EQUAL', 'OP_ACTIVEBYTECODE is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF OP_TXVERSION OP_ENDIF OP_TXVERSION OP_TXVERSION OP_EQUAL', 'OP_TXVERSION is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF OP_TXINPUTCOUNT OP_ENDIF OP_TXINPUTCOUNT OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF OP_TXOUTPUTCOUNT OP_ENDIF OP_TXOUTPUTCOUNT OP_TXOUTPUTCOUNT OP_EQUAL', 'OP_TXOUTPUTCOUNT is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF OP_TXLOCKTIME OP_ENDIF OP_TXLOCKTIME OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_UTXOVALUE OP_ENDIF <0> OP_UTXOVALUE <0> OP_UTXOVALUE OP_EQUAL', 'OP_UTXOVALUE is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_UTXOBYTECODE OP_ENDIF <0> OP_UTXOBYTECODE <0> OP_UTXOBYTECODE OP_EQUAL', 'OP_UTXOBYTECODE is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_OUTPOINTTXHASH OP_ENDIF <0> OP_OUTPOINTTXHASH <0> OP_OUTPOINTTXHASH OP_EQUAL', 'OP_OUTPOINTTXHASH is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_OUTPOINTINDEX OP_ENDIF <0> OP_OUTPOINTINDEX <0> OP_OUTPOINTINDEX OP_EQUAL', 'OP_OUTPOINTINDEX is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_INPUTBYTECODE OP_ENDIF <0> OP_INPUTBYTECODE <0> OP_INPUTBYTECODE OP_EQUAL', 'OP_INPUTBYTECODE is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_INPUTSEQUENCENUMBER OP_ENDIF <0> OP_INPUTSEQUENCENUMBER <0> OP_INPUTSEQUENCENUMBER OP_EQUAL', 'OP_INPUTSEQUENCENUMBER is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_OUTPUTVALUE OP_ENDIF <0> OP_OUTPUTVALUE <0> OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE is conditionally executed', ['2021_invalid']],
      ['<0>', 'OP_IF <0> OP_OUTPUTBYTECODE OP_ENDIF <0> OP_OUTPUTBYTECODE <0> OP_OUTPUTBYTECODE OP_EQUAL', 'OP_OUTPUTBYTECODE is conditionally executed', ['2021_invalid']],
    ],
  ],
  [
    'Operations copy by value',
    [
      // TODO: all other operations that push
      ['<1>', 'OP_INPUTINDEX OP_INPUTINDEX OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_INPUTINDEX pushes an independent stack item', ['2021_invalid']],
      ['<1>', 'OP_ACTIVEBYTECODE OP_ACTIVEBYTECODE OP_REVERSEBYTES OP_EQUAL OP_NOT OP_VERIFY', 'each OP_ACTIVEBYTECODE pushes an independent stack item', ['2021_invalid']],
      ['<1>', 'OP_TXVERSION OP_TXVERSION OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_TXVERSION pushes an independent stack item', ['2021_invalid']],
      ['<1>', 'OP_TXINPUTCOUNT OP_TXINPUTCOUNT OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_TXINPUTCOUNT pushes an independent stack item', ['2021_invalid']],
      ['<1>', 'OP_TXOUTPUTCOUNT OP_TXOUTPUTCOUNT OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_TXOUTPUTCOUNT pushes an independent stack item', ['2021_invalid']],
      ['<1>', 'OP_TXLOCKTIME OP_TXLOCKTIME OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_TXLOCKTIME pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<1> OP_UTXOVALUE <1> OP_UTXOVALUE OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_UTXOVALUE pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<1> OP_UTXOBYTECODE <1> OP_UTXOBYTECODE OP_REVERSEBYTES OP_EQUAL OP_NOT OP_VERIFY', 'each OP_UTXOBYTECODE pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<1> OP_OUTPOINTTXHASH <1> OP_OUTPOINTTXHASH <0xf000000000000000000000000000000000000000000000000000000000000001> OP_XOR OP_EQUAL OP_NOT OP_VERIFY', 'each OP_OUTPOINTTXHASH pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<1> OP_OUTPOINTINDEX <1> OP_OUTPOINTINDEX OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_OUTPOINTINDEX pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<0> OP_INPUTBYTECODE <0> OP_INPUTBYTECODE OP_REVERSEBYTES OP_EQUAL OP_NOT OP_VERIFY', 'each OP_INPUTBYTECODE pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<1> OP_INPUTSEQUENCENUMBER <1> OP_INPUTSEQUENCENUMBER OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_INPUTSEQUENCENUMBER pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<0> OP_OUTPUTVALUE <0> OP_OUTPUTVALUE OP_1ADD OP_EQUAL OP_NOT OP_VERIFY', 'each OP_OUTPUTVALUE pushes an independent stack item', ['2021_invalid']],
      ['<1>', '<0> OP_OUTPUTBYTECODE <0> OP_OUTPUTBYTECODE OP_REVERSEBYTES OP_EQUAL OP_NOT OP_VERIFY', 'each OP_OUTPUTBYTECODE pushes an independent stack item', ['2021_invalid']],
    ],
  ],
  [
    'Transaction inspection',
    [
      ['<0>', 'OP_INPUTINDEX OP_EQUAL', 'OP_INPUTINDEX returns the index of the input currently being evaluated (0)', ['2021_invalid'], slot0Scenario],
      ['<0>', 'OP_INPUTINDEX OP_EQUAL', 'OP_INPUTINDEX returns the index of the input currently being evaluated (1, expects 0)', ['invalid']],
      ['<1>', 'OP_INPUTINDEX OP_EQUAL', 'OP_INPUTINDEX returns the index of the input currently being evaluated (1)', ['2021_invalid']],
      ['<2>', 'OP_INPUTINDEX OP_EQUAL', 'OP_INPUTINDEX returns the index of the input currently being evaluated (2)', ['2021_invalid'], slot2Scenario],
      ['<9>', 'OP_INPUTINDEX OP_EQUAL', 'OP_INPUTINDEX returns the index of the input currently being evaluated (9)', ['2021_invalid'], slot9Scenario],
      ['<OP_ACTIVEBYTECODE OP_EQUAL>', 'OP_ACTIVEBYTECODE OP_EQUAL', 'OP_ACTIVEBYTECODE returns the bytecode currently being evaluated', ['2021_invalid']],
      ['<OP_SIZE <5> OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL>', 'OP_SIZE <5> OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL', 'OP_ACTIVEBYTECODE returns the bytecode currently being evaluated (check size)', ['2021_invalid']],
      ['<OP_DUP OP_SIZE <8> OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL>', 'OP_DUP OP_SIZE <8> OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL', 'OP_ACTIVEBYTECODE returns the same bytecode each time (without OP_CODESEPARATOR)', ['2021_invalid']],
      ['<OP_ACTIVEBYTECODE OP_EQUAL>', 'OP_SIZE <2> OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_EQUAL', 'OP_ACTIVEBYTECODE respects OP_CODESEPARATOR', ['2021_invalid']],
      ['<OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL>', 'OP_SIZE <3> OP_CODESEPARATOR OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL', 'OP_ACTIVEBYTECODE respects a single OP_CODESEPARATOR (includes the OP_EQUALVERIFY)', ['2021_invalid']],
      ['<OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_EQUAL>', 'OP_SIZE <3> OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_EQUAL', 'Active bytecode begins after the last OP_CODESEPARATOR', ['invalid']],
      ['<OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUAL>', 'OP_SIZE <3> OP_CODESEPARATOR OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUAL', 'OP_ACTIVEBYTECODE returns only the bytecode after the last executed OP_CODESEPARATOR', ['2021_invalid']],
      [
        '<OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUAL> <OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUAL>',
        'OP_SIZE <6> OP_CODESEPARATOR OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUAL',
        'OP_ACTIVEBYTECODE returns only the bytecode after the last executed OP_CODESEPARATOR (two OP_ACTIVEBYTECODEs)',
        ['2021_invalid'],
      ],
      [
        '<OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL> <OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL> <OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL> <OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL>',
        'OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR OP_ACTIVEBYTECODE OP_CODESEPARATOR OP_EQUALVERIFY OP_ACTIVEBYTECODE OP_EQUAL',
        'OP_ACTIVEBYTECODE works before and after multiple OP_CODESEPARATORs',
        ['2021_invalid'],
      ],
      ['<1>', 'OP_INPUTINDEX OP_UTXOBYTECODE OP_ACTIVEBYTECODE OP_EQUALVERIFY', '"OP_INPUTINDEX OP_UTXOBYTECODE" and "OP_ACTIVEBYTECODE" differ in P2SH contracts (working nonP2SH)', ['2021_invalid', 'p2sh_invalid']],
      ['<OP_HASH160 OP_PUSHBYTES_20>', 'OP_ACTIVEBYTECODE OP_HASH160 <OP_EQUAL> OP_CAT OP_CAT OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUAL', '"OP_INPUTINDEX OP_UTXOBYTECODE" and "OP_ACTIVEBYTECODE" differ in P2SH contracts (working P2SH)', ['2021_invalid', 'nonP2sh_invalid']],
      ['<0>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version == 0)', ['2021_invalid', '2022_valid'], { transaction: { version: 0 } }],
      ['<1>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version == 1)', ['2021_invalid'], { transaction: { version: 1 } }],
      ['<2>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version == 2)', ['2021_invalid']],
      ['<3>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version == 2, while version 3 is expected)', ['invalid']],
      ['<3>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version == 3)', ['2021_invalid', '2022_valid'], { transaction: { version: 3 } }],
      ['<123456>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version == 123456)', ['2021_invalid', '2022_valid'], { transaction: { version: 123456 } }],
      // Libauth considers version to be an unsigned integer, but the Satoshi implementation considers it to be signed
      ['<-2>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version 0xfeffffff; 4294967294 unsigned, -2 signed)', ['2021_invalid', '2022_valid'], { transaction: { version: 4294967294 } }],
      ['<-1>', 'OP_TXVERSION OP_EQUAL', 'OP_TXVERSION (version 0xffffffff; 4294967295 unsigned, -1 signed)', ['2021_invalid', '2022_valid'], { transaction: { version: 4294967295 } }],
      ['<2>', 'OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT (2 inputs)', ['2021_invalid']],
      ['<1>', 'OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT (2 inputs, 1 expected)', ['invalid']],
      ['<1> <"100-byte tx size minimum 123456789012345678901234567890">', 'OP_DROP OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT (1 input)', ['2021_invalid'], { sourceOutputs: [{ lockingBytecode: ['slot'], valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }] } }],
      ['<3>', 'OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT (3 inputs)', ['2021_invalid'], slot2Scenario],
      ['<10>', 'OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT (10 inputs)', ['2021_invalid'], slot9Scenario],
      ['<101>', 'OP_TXINPUTCOUNT OP_EQUAL', 'OP_TXINPUTCOUNT (101 inputs)', ['2021_invalid'], { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(100).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(100).map(() => ({ unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } }],
      ['<1>', 'OP_TXOUTPUTCOUNT OP_EQUAL', 'OP_TXOUTPUTCOUNT (1 output)', ['2021_invalid']],
      ['<2>', 'OP_TXOUTPUTCOUNT OP_EQUAL', 'OP_TXOUTPUTCOUNT (2 outputs)', ['2021_invalid'], { transaction: { outputs: [...range(2).map(() => ({ lockingBytecode: { script: 'vmbTestNullData' } }))] } }],
      ['<3>', 'OP_TXOUTPUTCOUNT OP_EQUAL', 'OP_TXOUTPUTCOUNT (3 outputs)', ['2021_invalid'], { transaction: { outputs: [...range(3).map(() => ({ lockingBytecode: { script: 'vmbTestNullData' } }))] } }],
      ['<20>', 'OP_TXOUTPUTCOUNT OP_EQUAL', 'OP_TXOUTPUTCOUNT (20 outputs)', ['2021_invalid'], { transaction: { outputs: [...range(20).map(() => ({ lockingBytecode: { script: 'vmbTestNullData' } }))] } }],
      ['<100>', 'OP_TXOUTPUTCOUNT OP_EQUAL', 'OP_TXOUTPUTCOUNT (100 outputs; non-standard beyond per-transaction OP_RETURN data limit)', ['2021_invalid', '2022_valid'], { transaction: { outputs: [...range(100).map(() => ({ lockingBytecode: { script: 'vmbTestNullData' } }))] } }],
      ['<0>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 0)', ['2021_invalid']],
      ['<1>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 0, but expects 1)', ['invalid']],
      ['<1>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 1)', ['2021_invalid'], { transaction: { locktime: 1 } }],
      ['<2>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 2)', ['2021_invalid'], { transaction: { locktime: 2 } }],
      ['<499_999_999>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 499999999, the maximum block height)', ['2021_invalid'], { transaction: { locktime: 499_999_999 } }],
      ['<500_000_000>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 500000000, the minimum UNIX timestamp)', ['2021_invalid'], { transaction: { locktime: 500_000_000 } }],
      ['<4_294_967_294>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 4294967294)', ['2021_invalid'], { transaction: { locktime: 4_294_967_294 } }],
      ['<4_294_967_295>', 'OP_TXLOCKTIME OP_EQUAL', 'OP_TXLOCKTIME (locktime == 4294967295)', ['2021_invalid'], { transaction: { locktime: 4_294_967_295 } }],
      ['<10_000> <0>', 'OP_UTXOVALUE OP_EQUAL', 'OP_UTXOVALUE (10000)', ['2021_invalid']],
      ['<10_001> <0>', 'OP_UTXOVALUE OP_EQUAL', 'OP_UTXOVALUE (10000, expects 10001)', ['invalid']],
      ['<1>', '<0> OP_UTXOVALUE OP_DROP', 'OP_UTXOVALUE (ignore result)', ['2021_invalid']],
      ['<1>', '<1> OP_UTXOVALUE OP_DROP', 'OP_UTXOVALUE (ignore result, index 1)', ['2021_invalid']],
      ['<1>', '<-1> OP_UTXOVALUE OP_DROP', 'OP_UTXOVALUE (ignore result, negative index)', ['invalid']],
      ['<1>', '<0x0100> OP_UTXOVALUE OP_DROP', 'OP_UTXOVALUE (ignore result, index 1, non-minimally encoded)', ['invalid']],
      ['<1>', '<2> OP_UTXOVALUE OP_DROP', 'OP_UTXOVALUE (ignore result, index 2, greater than maximum index)', ['invalid']],
      ['<10_000> <1>', 'OP_UTXOVALUE OP_EQUAL', 'OP_UTXOVALUE (10000; input 1)', ['2021_invalid']],
      [
        '<123_456> <100>',
        'OP_UTXOVALUE OP_EQUAL',
        'OP_UTXOVALUE (123456; input 101)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(100).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 123_456 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(100).map(() => ({ unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      ['<123_456_789> <0>', 'OP_UTXOVALUE OP_EQUAL', 'OP_UTXOVALUE (1.23456789 BCH)', ['2021_invalid'], { sourceOutputs: [{ lockingBytecode: ['slot'], valueSatoshis: 123_456_789 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }], outputs: [{ lockingBytecode: binToHex(cashAssemblyToBin('OP_RETURN <"100-byte tx size minimum 1234567">') as Uint8Array) }] } }],
      [
        '<2_100_000_000_000_000> <0>',
        'OP_UTXOVALUE OP_EQUAL',
        'OP_UTXOVALUE (21,000,000 BCH)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'], valueSatoshis: binToHex(bigIntToBinUint64LE(BigInt(21_000_000) * BigInt(100_000_000))) }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }], outputs: [{ lockingBytecode: binToHex(cashAssemblyToBin('OP_RETURN <"100-byte tx size minimum 1234">') as Uint8Array) }] } },
      ],
      [
        '<9223372036854775807> <0>',
        'OP_UTXOVALUE OP_EQUAL',
        'OP_UTXOVALUE (maximum VM Number satoshis)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'], valueSatoshis: binToHex(bigIntToBinUint64LE(BigInt('9223372036854775807'))) }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }], outputs: [{ lockingBytecode: binToHex(cashAssemblyToBin('OP_RETURN <"100-byte tx size minimum 123">') as Uint8Array) }] } },
      ],
      [
        '<9223372036854775808> <0>',
        'OP_UTXOVALUE OP_EQUAL',
        'OP_UTXOVALUE (9223372036854775808 satoshis, exceeds maximum VM Number)',
        ['invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'], valueSatoshis: binToHex(bigIntToBinUint64LE(BigInt('9223372036854775808'))) }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }], outputs: [{ lockingBytecode: binToHex(cashAssemblyToBin('OP_RETURN <"100-byte tx size minimum 123">') as Uint8Array) }] } },
      ],
      ['<<1> OP_UTXOBYTECODE OP_EQUAL>', '<1> OP_UTXOBYTECODE OP_EQUAL', 'OP_UTXOBYTECODE (<<1> OP_UTXOBYTECODE OP_EQUAL>; nonP2SH)', ['2021_invalid', 'p2sh_invalid']],
      ['<0xa914baae9f614b7d4cde00a5c2ea454f59b5a3f91a2d87>', '<1> OP_UTXOBYTECODE OP_EQUAL', 'OP_UTXOBYTECODE (<<1> OP_UTXOBYTECODE OP_EQUAL>; P2SH20)', ['2021_invalid', 'nonP2sh20_invalid']],
      ['<0x76a91460011c6bf3f1dd98cff576437b9d85de780f497488ac>', '<0> OP_UTXOBYTECODE OP_EQUAL', 'OP_UTXOBYTECODE (<simple p2pkh output>; input 0)', ['2021_invalid']],
      ['<1>', '<0> OP_UTXOBYTECODE OP_DROP', 'OP_UTXOBYTECODE (ignore result, input 0)', ['2021_invalid']],
      ['<1>', '<1> OP_UTXOBYTECODE OP_DROP', 'OP_UTXOBYTECODE (ignore result, input 1)', ['2021_invalid']],
      ['<1>', '<-1> OP_UTXOBYTECODE OP_DROP', 'OP_UTXOBYTECODE (ignore result, negative input)', ['invalid']],
      ['<1>', '<0x0100> OP_UTXOBYTECODE OP_DROP', 'OP_UTXOBYTECODE (ignore result, input 1, non-minimally encoded)', ['invalid']],
      ['<1>', '<2> OP_UTXOBYTECODE OP_DROP', 'OP_UTXOBYTECODE (ignore result, input 2, greater than maximum input index)', ['invalid']],
      [
        `<<0x${range(513)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}> OP_DROP <1> OP_UTXOBYTECODE OP_EQUAL>`,
        `<0x${range(513)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}> OP_DROP <1> OP_UTXOBYTECODE OP_EQUAL`,
        'OP_UTXOBYTECODE (maximum size UTXO bytecode)',
        ['2021_invalid', 'p2sh_ignore'],
      ],
      [
        '<1>',
        `<0x${range(513)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}> OP_DROP <1> OP_UTXOBYTECODE OP_DROP`,
        'OP_UTXOBYTECODE (ignore result, not excessive size)',
        ['2021_invalid', 'p2sh_ignore'],
      ],
      [
        '<1>',
        `<0x${range(514)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}> OP_DROP <1> OP_UTXOBYTECODE OP_DROP`,
        'OP_UTXOBYTECODE (ignore result, excessive size)',
        ['invalid', 'p2sh_ignore'],
      ],
      [
        '<<0x00 42> OP_EQUAL> <<0x00 13> OP_EQUAL> <<0x00 7> OP_EQUAL> <<0x00 3> OP_EQUAL> <<0x00 2> OP_EQUAL> <<0x00 1> OP_EQUAL> <<0> OP_UTXOBYTECODE OP_EQUALVERIFY <1> OP_CODESEPARATOR OP_UTXOBYTECODE OP_EQUALVERIFY <2> OP_UTXOBYTECODE OP_EQUALVERIFY <3> OP_UTXOBYTECODE OP_CODESEPARATOR OP_EQUALVERIFY <7> OP_UTXOBYTECODE OP_EQUALVERIFY <13> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <42> OP_UTXOBYTECODE OP_EQUAL>',
        `<0> OP_UTXOBYTECODE OP_EQUALVERIFY <1> OP_CODESEPARATOR OP_UTXOBYTECODE OP_EQUALVERIFY <2> OP_UTXOBYTECODE OP_EQUALVERIFY <3> OP_UTXOBYTECODE OP_CODESEPARATOR OP_EQUALVERIFY <7> OP_UTXOBYTECODE OP_EQUALVERIFY <13> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <42> OP_UTXOBYTECODE OP_EQUAL`,
        'multiple OP_UTXOBYTECODEs, OP_CODESEPARATOR has no effect (50 inputs)',
        ['invalid', '2022_nonP2sh_valid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ lockingBytecode: { script: `lock${i}` }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ unlockingBytecode: { script: `unlock${i}` } }))] } },
        range(49, 1).reduce((agg, i) => ({ ...agg, [`unlock${i}`]: { script: `<0x00 ${i}>`, unlocks: `lock${i}` }, [`lock${i}`]: { lockingType: 'standard', script: `<0x00 ${i}> OP_EQUAL` } }), {}),
      ],
      [
        '<OP_HASH160 <$(<<0x00 3> OP_EQUAL> OP_HASH160)> OP_EQUAL> <OP_HASH160 <$(<<0x00 2> OP_EQUAL> OP_HASH160)> OP_EQUAL> <OP_HASH160 <$(<<0x00 1> OP_EQUAL> OP_HASH160)> OP_EQUAL> <OP_HASH160 <$(<<0> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <1> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <2> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <3> OP_UTXOBYTECODE OP_EQUAL> OP_HASH160)> OP_EQUAL>',
        `<0> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <1> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <2> OP_UTXOBYTECODE OP_EQUALVERIFY OP_CODESEPARATOR <3> OP_UTXOBYTECODE OP_EQUAL`,
        'multiple OP_UTXOBYTECODEs, OP_CODESEPARATOR has no effect (50 inputs, standard transaction)',
        ['invalid', '2022_p2sh_standard'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ lockingBytecode: { script: `lock${i}` }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ unlockingBytecode: { script: `unlock${i}` } }))] } },
        range(49, 1).reduce((agg, i) => ({ ...agg, [`unlock${i}`]: { script: `<0x00 ${i}>`, unlocks: `lock${i}` }, [`lock${i}`]: { lockingType: 'p2sh20', script: `<0x00 ${i}> OP_EQUAL` } }), {}),
      ],
      ['<0x0100000000000000000000000000000000000000000000000000000000000000>', '<0> OP_OUTPOINTTXHASH OP_EQUAL', 'OP_OUTPOINTTXHASH (input 0)', ['2021_invalid']],
      ['<0x0100000000000000000000000000000000000000000000000000000000000000>', '<1> OP_OUTPOINTTXHASH OP_EQUAL', 'OP_OUTPOINTTXHASH (input 1)', ['2021_invalid']],
      [
        '<0x6fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000>',
        '<1> OP_OUTPOINTTXHASH OP_EQUAL',
        'OP_OUTPOINTTXHASH returns in OP_HASH256 order (genesis block)',
        ['2021_invalid'],
        {
          sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }],
          transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { outpointTransactionHash: binToHex(hashTransactionUiOrder(hexToBin('0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c'))), unlockingBytecode: { script: 'unlockEmptyP2sh20' } }] },
        },
      ],
      ['<0x0000000000000000000000000000000000000000000000000000000000000001>', '<1> OP_OUTPOINTTXHASH OP_EQUAL', 'OP_OUTPOINTTXHASH (input 1, expected 0x00...01)', ['invalid']],
      [
        '<0x000000000000000000000000000000000000000000000000000000000000001>',
        '<1> OP_OUTPOINTTXHASH OP_EQUAL',
        'OP_OUTPOINTTXHASH (input 1, 0x00...01)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { outpointTransactionHash: '0100000000000000000000000000000000000000000000000000000000000000', unlockingBytecode: { script: 'unlockEmptyP2sh20' } }] } },
      ],
      ['<1>', '<0> OP_OUTPOINTTXHASH OP_DROP', 'OP_OUTPOINTTXHASH (ignore result, input 0)', ['2021_invalid']],
      ['<1>', '<1> OP_OUTPOINTTXHASH OP_DROP', 'OP_OUTPOINTTXHASH (ignore result, input 1)', ['2021_invalid']],
      ['<1>', '<0x0100> OP_OUTPOINTTXHASH OP_DROP', 'OP_OUTPOINTTXHASH (ignore result, input 1, non-minimally encoded)', ['invalid']],
      ['<1>', '<-1> OP_OUTPOINTTXHASH OP_DROP', 'OP_OUTPOINTTXHASH (ignore result, negative input)', ['invalid']],
      ['<1>', '<2> OP_OUTPOINTTXHASH OP_DROP', 'OP_OUTPOINTTXHASH (ignore result, input 2, greater than maximum input)', ['invalid']],
      [
        '<1>',
        '<2> OP_OUTPOINTTXHASH OP_DROP',
        'OP_OUTPOINTTXHASH (ignore result, input 2)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(2).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(2).map(() => ({ unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      [
        '<42> <13> <3>',
        '<0> OP_OUTPOINTTXHASH <0> OP_OUTPOINTTXHASH OP_EQUALVERIFY <1> OP_OUTPOINTTXHASH <1> OP_OUTPOINTTXHASH OP_EQUALVERIFY <3> OP_OUTPOINTTXHASH <1> OP_SPLIT OP_DROP OP_EQUALVERIFY <13> OP_OUTPOINTTXHASH <1> OP_SPLIT OP_DROP OP_EQUALVERIFY <42> OP_OUTPOINTTXHASH <1> OP_SPLIT OP_DROP OP_EQUAL',
        'multiple OP_OUTPOINTTXHASHs (50 inputs)',
        ['2021_invalid'],
        {
          sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(49, 1).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))],
          transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ outpointTransactionHash: binToHex(Uint8Array.of(i)).padStart(64, '0'), unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] },
        },
      ],
      ['<0>', '<0> OP_OUTPOINTINDEX OP_EQUAL', 'OP_OUTPOINTINDEX (input 0)', ['2021_invalid']],
      ['<1>', '<1> OP_OUTPOINTINDEX OP_EQUAL', 'OP_OUTPOINTINDEX (input 1)', ['2021_invalid']],
      ['<0>', '<1> OP_OUTPOINTINDEX OP_EQUAL', 'OP_OUTPOINTINDEX (input 1, expected 0)', ['invalid']],
      ['<1>', '<1> OP_OUTPOINTINDEX OP_EQUAL', 'OP_OUTPOINTINDEX (input 1, 1)', ['2021_invalid'], { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { outpointIndex: 1, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }] } }],
      ['<1>', '<0> OP_OUTPOINTINDEX OP_DROP', 'OP_OUTPOINTINDEX (ignore result, input 0)', ['2021_invalid']],
      ['<1>', '<1> OP_OUTPOINTINDEX OP_DROP', 'OP_OUTPOINTINDEX (ignore result, input 1)', ['2021_invalid']],
      ['<1>', '<0x0100> OP_OUTPOINTINDEX OP_DROP', 'OP_OUTPOINTINDEX (ignore result, input 1, non-minimally encoded)', ['invalid']],
      ['<1>', '<-1> OP_OUTPOINTINDEX OP_DROP', 'OP_OUTPOINTINDEX (ignore result, negative input)', ['invalid']],
      ['<1>', '<2> OP_OUTPOINTINDEX OP_DROP', 'OP_OUTPOINTINDEX (ignore result, input 2, greater than maximum input index)', ['invalid']],
      [
        '<1>',
        '<2> OP_OUTPOINTINDEX OP_DROP',
        'OP_OUTPOINTINDEX (ignore result, input 2)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(2).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(2).map(() => ({ unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      [
        '<42> <13> <3>',
        '<0> OP_OUTPOINTINDEX <0> OP_EQUALVERIFY <1> OP_OUTPOINTINDEX <1> OP_OUTPOINTINDEX OP_EQUALVERIFY <3> OP_OUTPOINTINDEX OP_EQUALVERIFY <13> OP_OUTPOINTINDEX OP_EQUALVERIFY <42> OP_OUTPOINTINDEX OP_EQUAL',
        'multiple OP_OUTPOINTINDEXs (50 inputs)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(49, 1).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ outpointIndex: i, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      ['<0>', 'OP_INPUTBYTECODE <<0x7dfb529d352908ee0a88a0074c216b09793d6aa8c94c7640bb4ced51eaefc75d0aef61f7685d0307491e2628da3d4f91e86329265a4a58ca27a41ec0b8910779c3> <0x03a524f43d6166ad3567f18b0a5c769c6ab4dc02149f4d5095ccf4e8ffa293e785>> OP_EQUAL', 'OP_INPUTBYTECODE (input 0)', ['2021_invalid']],
      ['<1>', 'OP_INPUTBYTECODE <<1>> OP_EQUAL', 'OP_INPUTBYTECODE (self, nonP2SH)', ['invalid', '2022_nonP2sh_valid']],
      ['<1> OP_CODESEPARATOR <1>', 'OP_VERIFY OP_INPUTBYTECODE <<1> OP_CODESEPARATOR <1>> OP_EQUAL', 'OP_INPUTBYTECODE,  OP_CODESEPARATOR in input bytecode has no effect (self, nonP2SH)', ['invalid', '2022_nonP2sh_valid']],
      ['<OP_DUP OP_SIZE OP_SWAP OP_CAT OP_CODESEPARATOR OP_NIP OP_DUP OP_CAT OP_CODESEPARATOR <1> OP_INPUTBYTECODE OP_EQUALVERIFY <1>>', 'OP_DUP OP_SIZE OP_SWAP OP_CAT OP_CODESEPARATOR OP_NIP OP_DUP OP_CAT OP_CODESEPARATOR <1> OP_INPUTBYTECODE OP_EQUALVERIFY <1>', 'OP_INPUTBYTECODE, OP_CODESEPARATOR in redeem bytecode has no effect (self, P2SH20)', ['invalid', '2022_p2sh_standard']],
      ['<1>', 'OP_INPUTBYTECODE <2> OP_SPLIT OP_CODESEPARATOR OP_HASH160 <OP_HASH160 OP_PUSHBYTES_20> OP_SWAP OP_CAT <OP_EQUAL> OP_CAT OP_CODESEPARATOR <1> OP_UTXOBYTECODE OP_EQUALVERIFY <1> OP_SPLIT OP_DROP <<1>> OP_EQUAL', 'OP_INPUTBYTECODE, OP_CODESEPARATOR in redeem bytecode has no effect (self, P2SH20, compare OP_UTXOBYTECODE)', ['invalid', '2022_p2sh_standard']],
      ['<1>', 'OP_INPUTBYTECODE <1> OP_EQUAL', 'OP_INPUTBYTECODE (input 1, expected missing OP_PUSHBYTES_1)', ['invalid']],
      ['<1>', '<0> OP_INPUTBYTECODE OP_DROP', 'OP_INPUTBYTECODE (ignore result, input 0)', ['2021_invalid']],
      ['<1>', '<1> OP_INPUTBYTECODE OP_DROP', 'OP_INPUTBYTECODE (ignore result, input 1)', ['2021_invalid']],
      ['<1>', '<0x0100> OP_INPUTBYTECODE OP_DROP', 'OP_INPUTBYTECODE (ignore result, input 1, non-minimally encoded)', ['invalid']],
      ['<1>', '<-1> OP_INPUTBYTECODE OP_DROP', 'OP_INPUTBYTECODE (ignore result, negative input)', ['invalid']],
      ['<1>', '<2> OP_INPUTBYTECODE OP_DROP', 'OP_INPUTBYTECODE (ignore result, input 2, greater than maximum input index)', ['invalid']],
      [
        '<1>',
        '<2> OP_INPUTBYTECODE OP_DROP',
        'OP_INPUTBYTECODE (ignore result, input 2)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(2).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(2).map(() => ({ unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      [
        '<<0x00 42> <<0x00 42> OP_EQUAL>> <<0x00 13> <<0x00 13> OP_EQUAL>> <<0x00 7> <<0x00 7> OP_EQUAL>> <<0x00 1> <<0x00 1> OP_EQUAL>>',
        `<0> OP_INPUTBYTECODE <0> OP_INPUTBYTECODE OP_EQUALVERIFY <1> OP_INPUTBYTECODE OP_EQUALVERIFY <7> OP_INPUTBYTECODE OP_EQUALVERIFY <13> OP_INPUTBYTECODE OP_EQUALVERIFY <42> OP_INPUTBYTECODE OP_EQUAL`,
        'multiple OP_INPUTBYTECODEs (50 inputs)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ lockingBytecode: { script: `lock${i}` }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ unlockingBytecode: { script: `unlock${i}` } }))] } },
        range(49, 1).reduce((agg, i) => ({ ...agg, [`unlock${i}`]: { script: `<0x00 ${i}>`, unlocks: `lock${i}` }, [`lock${i}`]: { lockingType: 'p2sh20', script: `<0x00 ${i}> OP_EQUAL` } }), {}),
      ],
      [
        `<0x${range(517)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>`,
        `<<0x${range(517)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>> <1> OP_INPUTBYTECODE OP_EQUAL OP_NIP`,
        'OP_INPUTBYTECODE (maximum size)',
        ['2021_invalid', 'p2sh_ignore'],
      ],
      [
        `<0x${range(518)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>`,
        `<<0x${range(518)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>> <1> OP_INPUTBYTECODE OP_EQUAL OP_NIP`,
        'OP_INPUTBYTECODE (excessive size)',
        ['invalid', 'p2sh_ignore'],
      ],
      [
        `<1> <0x${range(511)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>`,
        `OP_DROP <1> OP_INPUTBYTECODE OP_DROP`,
        'OP_INPUTBYTECODE (ignore result, not excessive size)',
        ['2021_invalid'],
      ],
      [
        `<1> <0x${range(518)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>`,
        `OP_DROP <1> OP_INPUTBYTECODE OP_DROP`,
        'OP_INPUTBYTECODE (ignore result, excessive size)',
        ['invalid'],
      ],
      ['<0>', '<0> OP_INPUTSEQUENCENUMBER OP_EQUAL', 'OP_INPUTSEQUENCENUMBER (input 0)', ['2021_invalid']],
      ['<0>', '<1> OP_INPUTSEQUENCENUMBER OP_EQUAL', 'OP_INPUTSEQUENCENUMBER (input 1)', ['2021_invalid']],
      ['<1>', '<1> OP_INPUTSEQUENCENUMBER OP_EQUAL', 'OP_INPUTSEQUENCENUMBER (input 1, expected 1)', ['invalid']],
      ['<1>', '<1> OP_INPUTSEQUENCENUMBER OP_EQUAL', 'OP_INPUTSEQUENCENUMBER (input 1, 1)', ['2021_invalid'], { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { sequenceNumber: 1, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }] } }],
      [
        '<4294967295>',
        '<0> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'OP_INPUTSEQUENCENUMBER (input 0 sequence number: 4294967295; disables locktime support)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ sequenceNumber: 4294967295, unlockingBytecode: ['slot'] }, { unlockingBytecode: { script: 'unlockEmptyP2sh20' } }] } },
      ],
      [
        '<4294967294>',
        '<1> OP_CHECKLOCKTIMEVERIFY OP_DROP <0> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'OP_INPUTSEQUENCENUMBER (input 0 sequence number: 4294967294; locktime not disabled)',
        ['2021_invalid'],
        {
          sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }],
          transaction: {
            inputs: [{ sequenceNumber: 4294967294, unlockingBytecode: ['slot'] }, { unlockingBytecode: { script: 'unlockEmptyP2sh20' } }],
            locktime: 1,
          },
        },
      ],
      [
        '<4294967295>',
        '<1> OP_CHECKLOCKTIMEVERIFY OP_DROP <0> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'OP_INPUTSEQUENCENUMBER (input 0 sequence number: 4294967295; while locktime is not disabled for this transaction, it is disabled for input 0, causing a failure)',
        ['invalid'],
        {
          sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }],
          transaction: {
            inputs: [{ sequenceNumber: 4294967295, unlockingBytecode: ['slot'] }, { unlockingBytecode: { script: 'unlockEmptyP2sh20' } }],
            locktime: 1,
          },
        },
      ],
      [
        '<4294967295>',
        '<1> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'OP_INPUTSEQUENCENUMBER (input 1 sequence number: 4294967295; disables locktime support)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { sequenceNumber: 4294967295, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }] } },
      ],
      [
        '<4294967294>',
        '<1> OP_CHECKLOCKTIMEVERIFY OP_DROP <1> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'OP_INPUTSEQUENCENUMBER (input 1 sequence number: 4294967294; locktime enabled)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { sequenceNumber: 4294967294, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }], locktime: 1 } },
      ],
      [
        '<4294967295>',
        '<1> OP_CHECKLOCKTIMEVERIFY OP_DROP <1> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'OP_INPUTSEQUENCENUMBER (input 1 sequence number: 4294967295; locktime is disabled for input 1, but remains enabled for input 0)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, { lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, { sequenceNumber: 4294967295, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }], locktime: 1 } },
      ],
      ['<1>', '<0> OP_INPUTSEQUENCENUMBER OP_DROP', 'OP_INPUTSEQUENCENUMBER (ignore result, input 0)', ['2021_invalid']],
      ['<1>', '<1> OP_INPUTSEQUENCENUMBER OP_DROP', 'OP_INPUTSEQUENCENUMBER (ignore result, input 1)', ['2021_invalid']],
      ['<1>', '<0x0100> OP_INPUTSEQUENCENUMBER OP_DROP', 'OP_INPUTSEQUENCENUMBER (ignore result, input 1, non-minimally encoded)', ['invalid']],
      ['<1>', '<-1> OP_INPUTSEQUENCENUMBER OP_DROP', 'OP_INPUTSEQUENCENUMBER (ignore result, negative input)', ['invalid']],
      ['<1>', '<2> OP_INPUTSEQUENCENUMBER OP_DROP', 'OP_INPUTSEQUENCENUMBER (ignore result, input 2, greater than maximum input index)', ['invalid']],
      [
        '<1>',
        '<2> OP_INPUTSEQUENCENUMBER OP_DROP',
        'OP_INPUTSEQUENCENUMBER (ignore result, input 2)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(2).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(2).map(() => ({ unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      [
        '<42> <13> <3>',
        '<0> OP_INPUTSEQUENCENUMBER <0> OP_EQUALVERIFY <1> OP_INPUTSEQUENCENUMBER <1> OP_INPUTSEQUENCENUMBER OP_EQUALVERIFY <3> OP_INPUTSEQUENCENUMBER OP_EQUALVERIFY <13> OP_INPUTSEQUENCENUMBER OP_EQUALVERIFY <42> OP_INPUTSEQUENCENUMBER OP_EQUAL',
        'multiple OP_INPUTSEQUENCENUMBERs (50 inputs)',
        ['2021_invalid'],
        { sourceOutputs: [{ lockingBytecode: ['slot'] }, ...range(49, 1).map(() => ({ lockingBytecode: { script: 'lockEmptyP2sh20' }, valueSatoshis: 10_000 }))], transaction: { inputs: [{ unlockingBytecode: ['slot'] }, ...range(49, 1).map((i) => ({ sequenceNumber: i, unlockingBytecode: { script: 'unlockEmptyP2sh20' } }))] } },
      ],
      ['<0>', '<0> OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (output 0)', ['2021_invalid']],
      ['<10_000>', '<0> OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (output 0, expected 10_000)', ['invalid']],
      ['<10_000>', '<0> OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (output 0, 10_000)', ['2021_invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }] } }],
      ['<1>', '<0> OP_OUTPUTVALUE OP_DROP', 'OP_OUTPUTVALUE (ignore result, output 0)', ['2021_invalid']],
      ['<1>', '<0x0000> OP_OUTPUTVALUE OP_DROP', 'OP_OUTPUTVALUE (ignore result, output 0, non-minimally encoded)', ['invalid']],
      ['<1>', '<-1> OP_OUTPUTVALUE OP_DROP', 'OP_OUTPUTVALUE (ignore result, negative output)', ['invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }, { valueSatoshis: 10_001 }] } }],
      ['<1>', '<2> OP_OUTPUTVALUE OP_DROP', 'OP_OUTPUTVALUE (ignore result, output 2, greater than maximum output index)', ['invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }, { valueSatoshis: 10_001 }] } }],
      ['<1>', '<2> OP_OUTPUTVALUE OP_DROP', 'OP_OUTPUTVALUE (ignore result, output 2)', ['2021_invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }, { valueSatoshis: 10_001 }, { valueSatoshis: 10_002 }] } }],
      ['<10_042> <10_013> <10_007> <10_001>', `<0> OP_OUTPUTVALUE <0> OP_OUTPUTVALUE OP_EQUALVERIFY <1> OP_OUTPUTVALUE OP_EQUALVERIFY <7> OP_OUTPUTVALUE OP_EQUALVERIFY <13> OP_OUTPUTVALUE OP_EQUALVERIFY <42> OP_OUTPUTVALUE OP_EQUAL`, 'multiple OP_OUTPUTVALUEs (50 inputs)', ['2021_invalid'], { transaction: { outputs: [...range(50).map((i) => ({ valueSatoshis: 10_000 + i }))] } }],
      ['<123_456_789> <0>', 'OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (1.23456789 BCH)', ['2021_invalid'], { transaction: { outputs: [{ valueSatoshis: 123_456_789 }] } }],
      ['<2_100_000_000_000_000> <0>', 'OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (21,000,000 BCH)', ['2021_invalid'], { transaction: { outputs: [{ valueSatoshis: binToHex(bigIntToBinUint64LE(BigInt(21_000_000) * BigInt(100_000_000))) }] } }],
      ['<9223372036854775807> <0>', 'OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (maximum VM Number satoshis)', ['2021_invalid'], { transaction: { outputs: [{ valueSatoshis: binToHex(bigIntToBinUint64LE(BigInt('9223372036854775807'))) }] } }],
      ['<9223372036854775808> <0>', 'OP_OUTPUTVALUE OP_EQUAL', 'OP_OUTPUTVALUE (9223372036854775808 satoshis, exceeds maximum VM Number)', ['invalid'], { transaction: { outputs: [{ valueSatoshis: binToHex(bigIntToBinUint64LE(BigInt('9223372036854775808'))) }] } }],
      ['<OP_RETURN <"vmb_test">>', '<0> OP_OUTPUTBYTECODE OP_EQUAL', 'OP_OUTPUTBYTECODE (output 0)', ['2021_invalid']],
      ['<OP_RETURN>', '<0> OP_OUTPUTBYTECODE OP_EQUAL', 'OP_OUTPUTBYTECODE (output 0, expected <OP_RETURN>)', ['invalid']],
      ['<OP_RETURN>', '<0> OP_OUTPUTBYTECODE OP_EQUAL', 'OP_OUTPUTBYTECODE (output 0, <OP_RETURN>)', ['2021_invalid'], { transaction: { outputs: [{ lockingBytecode: binToHex(cashAssemblyToBin('OP_RETURN') as Uint8Array), valueSatoshis: 10_000 }] } }],
      ['<OP_DROP OP_CODESEPARATOR <1>>', '<0> OP_CODESEPARATOR OP_OUTPUTBYTECODE OP_EQUAL', 'OP_OUTPUTBYTECODE, OP_CODESEPARATOR has no effect (output 0, <OP_RETURN>)', ['2021_invalid', '2022_valid'], { transaction: { outputs: [{ lockingBytecode: binToHex(cashAssemblyToBin('OP_DROP OP_CODESEPARATOR <1>') as Uint8Array), valueSatoshis: 10_000 }] } }],
      ['<1>', '<0> OP_OUTPUTBYTECODE OP_DROP', 'OP_OUTPUTBYTECODE (ignore result, output 0)', ['2021_invalid']],
      ['<1>', '<0x0000> OP_OUTPUTBYTECODE OP_DROP', 'OP_OUTPUTBYTECODE (ignore result, output 0, non-minimally encoded)', ['invalid']],
      ['<1>', '<-1> OP_OUTPUTBYTECODE OP_DROP', 'OP_OUTPUTBYTECODE (ignore result, negative output index)', ['invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }, { valueSatoshis: 10_001 }] } }],
      ['<1>', '<2> OP_OUTPUTBYTECODE OP_DROP', 'OP_OUTPUTBYTECODE (ignore result, output 2, greater than maximum output index)', ['invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }, { valueSatoshis: 10_001 }] } }],
      ['<1>', '<2> OP_OUTPUTBYTECODE OP_DROP', 'OP_OUTPUTBYTECODE (ignore result, output 2)', ['2021_invalid'], { transaction: { outputs: [{ valueSatoshis: 10_000 }, { valueSatoshis: 10_001 }, { valueSatoshis: 10_002 }] } }],
      [
        '<OP_RETURN <42>> <OP_RETURN <13>> <OP_RETURN <7>> <OP_RETURN <1>>',
        `<0> OP_OUTPUTBYTECODE <0> OP_OUTPUTBYTECODE OP_EQUALVERIFY <1> OP_OUTPUTBYTECODE OP_EQUALVERIFY <7> OP_OUTPUTBYTECODE OP_EQUALVERIFY <13> OP_OUTPUTBYTECODE OP_EQUALVERIFY <42> OP_OUTPUTBYTECODE OP_EQUAL`,
        'multiple OP_OUTPUTBYTECODEs (50 inputs)',
        ['2021_invalid'],
        { transaction: { outputs: [...range(50).map((i) => ({ lockingBytecode: binToHex(cashAssemblyToBin(`OP_RETURN <${i}>`) as Uint8Array), valueSatoshis: 10_000 + i }))] } },
      ],
      [
        `<OP_RETURN <0x${range(516)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>>`,
        `<0> OP_OUTPUTBYTECODE OP_EQUAL`,
        'OP_OUTPUTBYTECODE (maximum size)',
        ['2021_invalid', '2022_valid'],
        {
          transaction: {
            outputs: [
              {
                lockingBytecode: binToHex(
                  cashAssemblyToBin(
                    `OP_RETURN <0x${range(516)
                      .map((i) => binToHex(Uint8Array.of(i)))
                      .join('')}>`
                  ) as Uint8Array
                ),
              },
            ],
          },
        },
      ],
      [
        `<OP_RETURN <0x${range(517)
          .map((i) => binToHex(Uint8Array.of(i)))
          .join('')}>>`,
        `<0> OP_OUTPUTBYTECODE OP_EQUAL`,
        'OP_OUTPUTBYTECODE (excessive size)',
        ['invalid'],
        {
          transaction: {
            outputs: [
              {
                lockingBytecode: binToHex(
                  cashAssemblyToBin(
                    `OP_RETURN <0x${range(517)
                      .map((i) => binToHex(Uint8Array.of(i)))
                      .join('')}>`
                  ) as Uint8Array
                ),
              },
            ],
          },
        },
      ],
      [
        `<1>`,
        `<0> OP_OUTPUTBYTECODE OP_DROP`,
        'OP_OUTPUTBYTECODE (ignore result, not excessive size)',
        ['2021_invalid', '2022_valid'],
        {
          transaction: {
            outputs: [
              {
                lockingBytecode: binToHex(
                  cashAssemblyToBin(
                    `OP_RETURN <0x${range(516)
                      .map((i) => binToHex(Uint8Array.of(i)))
                      .join('')}>`
                  ) as Uint8Array
                ),
              },
            ],
          },
        },
      ],
      [
        `<1>`,
        `<0> OP_OUTPUTBYTECODE OP_DROP`,
        'OP_OUTPUTBYTECODE (ignore result, excessive size)',
        ['invalid'],
        {
          transaction: {
            outputs: [
              {
                lockingBytecode: binToHex(
                  cashAssemblyToBin(
                    `OP_RETURN <0x${range(517)
                      .map((i) => binToHex(Uint8Array.of(i)))
                      .join('')}>`
                  ) as Uint8Array
                ),
              },
            ],
          },
        },
      ],
    ],
  ],
];

export const vmbTestsBCH = vmbTestDefinitionsBCH.map(vmbTestGroupToVmbTests);