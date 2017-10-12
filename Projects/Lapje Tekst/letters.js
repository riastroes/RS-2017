function Alphabet() {
    this.alphabet = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,."

    this.letters = [];
    this.createLetters();
}
Alphabet.prototype.index = function(letter) {
    return this.alphabet.indexOf(letter);

}
Alphabet.prototype.get = function(letter, next) {
    var index = this.alphabet.indexOf(letter) * 2;
    if (next == 1) { index += 1; }
    if (this.letters[index] == []) {
        console.log("Deze letter bestaat nog niet: " + index);
    } else {
        console.log(letter);
    }
    return this.letters[index];
}
Alphabet.prototype.getStory = function(story, next) {
    var result = [];

    for (var i = 0; i < story.length; i++) {
        result[i] = this.get(story[i], next);
    }
    return result;
}

Alphabet.prototype.createLetters = function() {

    this.letters[0] = [15, 19]; //spatie
    this.letters[1] = [19, 15]; //-spatie

    this.letters[2] = [15, 16, 6, 16, 18, 13, 7, 6, 8, 19]; //a
    this.letters[3] = [19, 8, 6, 7, 13, 18, 16, 6, 16, 15]; //-a

    this.letters[4] = []; //b
    this.letters[5] = []; //-b

    this.letters[6] = []; //c
    this.letters[7] = []; //-c


    this.letters[8] = [15, 16, 11, 1, 16, 18, 8, 6, 8, 19]; //d
    this.letters[9] = [19, 8, 6, 8, 18, 16, 1, 11, 16, 15]; //-d

    this.letters[10] = [15, 17, 13, 8, 6, 11, 18, 19]; //e
    this.letters[11] = [19, 18, 11, 6, 8, 13, 17, 15]; //-e

    this.letters[12] = [15, 16, 13, 22, 23, 3, 2, 13, 19]; //f
    this.letters[13] = [19, 13, 2, 3, 23, 22, 13, 16, 15]; //-f

    this.letters[14] = [15, 22, 21, 6, 13, 17, 16, 6, 7, 19]; //g
    this.letters[15] = [19, 7, 6, 16, 17, 13, 6, 21, 22, 15]; //-g

    this.letters[16] = []; //h
    this.letters[17] = []; //-h

    this.letters[18] = [15, 17, 7, 12, 18, 19]; //i
    this.letters[19] = [19, 18, 12, 7, 17, 15]; //-i

    this.letters[20] = [15, 17, 23, 22, 7, 19]; //j
    this.letters[21] = [19, 7, 22, 23, 17, 15]; //-j

    this.letters[22] = [15, 16, 12, 6, 12, 13, 18, 3, 2, 7, 19]; //k
    this.letters[23] = [19, 7, 2, 3, 18, 13, 12, 6, 12, 16, 15]; //-k

    this.letters[24] = [15, 16, 12, 2, 1, 6, 19]; //l
    this.letters[25] = [19, 6, 1, 2, 12, 16, 15]; //-l


    this.letters[26] = [15, 16, 6, 7, 17, 7, 8, 18, 8, 9]; //m
    this.letters[27] = [9, 8, 18, 8, 7, 17, 7, 6, 16, 15]; //-m

    this.letters[28] = [15, 16, 6, 8, 18, 8, 19]; //n
    this.letters[29] = [19, 8, 18, 8, 6, 16, 15]; //-n

    this.letters[30] = [15, 11, 6, 8, 18, 16, 6, 8, 13, 19]; //o
    this.letters[31] = [19, 13, 8, 6, 16, 18, 8, 6, 11, 15]; //-o

    this.letters[32] = [15, 17, 10, 6, 7, 22, 7, 19]; //p
    this.letters[33] = [19, 7, 22, 7, 6, 10, 17, 15]; //-p

    this.letters[34] = []; //q
    this.letters[35] = []; //-q

    this.letters[36] = [15, 17, 13, 11, 6, 8, 18, 19]; //r
    this.letters[37] = [19, 18, 8, 6, 11, 13, 17, 15]; //-r


    this.letters[38] = [15, 17, 11, 12, 7, 19]; //s
    this.letters[39] = [19, 7, 12, 11, 17, 15]; //-s

    this.letters[40] = [15, 16, 17, 2, 7, 6, 19]; //t
    this.letters[41] = [19, 6, 7, 2, 17, 16, 15]; //-t

    this.letters[42] = []; //u
    this.letters[43] = []; //-u

    this.letters[44] = []; //v
    this.letters[45] = []; //-v

    this.letters[46] = []; //w
    this.letters[47] = []; //-w

    this.letters[48] = []; //x
    this.letters[49] = []; //-x

    this.letters[50] = []; //y
    this.letters[51] = []; //-y

    this.letters[52] = []; //z
    this.letters[53] = []; //-z

    this.letters[54] = []; //A
    this.letters[55] = []; //-A

    this.letters[56] = []; //B
    this.letters[57] = []; //-B

    this.letters[58] = []; //C
    this.letters[59] = []; //-C

    this.letters[60] = [15, 18, 17, 11, 6, 2, 3, 18, 19]; //D
    this.letters[61] = [19, 18, 3, 2, 6, 11, 17, 18, 15]; //-D

    this.letters[62] = []; //E
    this.letters[63] = []; //-E

    this.letters[64] = []; //F
    this.letters[65] = []; //-F

    this.letters[66] = [15, 11, 12, 10, 11, 16, 18, 3, 1, 6, 1, 3, 13, 19]; //G
    this.letters[67] = [19, 13, 3, 1, 6, 1, 3, 18, 16, 11, 10, 12, 11, 15]; //-G

    this.letters[68] = []; //H
    this.letters[69] = []; //-H

    this.letters[70] = []; //I
    this.letters[71] = []; //-I

    this.letters[72] = []; //J
    this.letters[73] = []; //-J

    this.letters[74] = []; //K
    this.letters[75] = []; //-K

    this.letters[76] = []; //L
    this.letters[77] = []; //-L

    this.letters[78] = [15, 16, 1, 7, 17, 2, 8, 18, 3, 19]; //M
    this.letters[79] = [19, 3, 18, 8, 2, 17, 7, 1, 16, 15]; //-M

    this.letters[80] = []; //N
    this.letters[81] = []; //-N

    this.letters[82] = [15, 4, 1, 3, 17, 16, 6, 7, 12, 19]; //O
    this.letters[83] = [19, 12, 7, 6, 16, 17, 3, 1, 4, 15]; //-O

    this.letters[84] = []; //P
    this.letters[85] = []; //-P

    this.letters[86] = []; //Q
    this.letters[87] = []; //-Q

    this.letters[88] = [15, 16, 13, 12, 6, 2, 3, 18, 19]; //R
    this.letters[89] = [19, 18, 3, 2, 6, 12, 13, 16, 15]; //-R

    this.letters[90] = []; //S
    this.letters[91] = []; //-S

    this.letters[92] = [15, 17, 2, 1, 4, 2, 12, 19]; //T
    this.letters[93] = [19, 12, 2, 4, 1, 2, 17, 15]; //-T

    this.letters[94] = []; //U
    this.letters[95] = []; //-U

    this.letters[96] = []; //V
    this.letters[97] = []; //-V

    this.letters[98] = [15, 11, 1, 16, 17, 2, 17, 18, 3, 13, 19]; //W
    this.letters[99] = [19, 13, 3, 18, 17, 2, 17, 16, 1, 11, 15]; //-W

    this.letters[100] = []; //X
    this.letters[101] = []; //-X

    this.letters[102] = []; //Y
    this.letters[103] = []; //-Y

    this.letters[104] = []; //Z
    this.letters[105] = []; //-Z

    this.letters[106] = [15, 19]; //,
    this.letters[107] = [19, 15]; //-,

    this.letters[108] = [15, 19]; //.
    this.letters[109] = [19, 15]; //-.




}