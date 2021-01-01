export default class Singlish {
	static get MARKUP_PATTERN() {
		return /(\\)?[a-zA-Z]+/;
	}

	static get CONSONANTS() {
		return /^((\\[nhNRJ])|(R?[bBcCdDfgGhjJkKlLmnNpPqsStTvwy])|(r))/;
	}

	static get SP_CONSONANTS() {
		return /^\\[nhNRJ]/;
	}

	static get CEREBRALS() {
		return /^[bcCdDgkpsStT]h/;
	}

	static get SP_CEREBRALS() {
		return /^[GK]N/;
	}

	static get NASALISED() {
		return /^(nnd(h)?|nng|mmb)/;
	}

	static get VOWELS() {
		return /^((a[au]?)|(ee?)|(ii?)|(oo?)|(uu?)|(Aa?)|I)/;
	}

	static get SP_CHARS() {
		return /^Ruu?/;
	}

	parse(text) {
		var literals = Singlish.LITERALS;

		var i = 0;
		while(true) {
			if (i >= 50) break;

			var yansaya = 0, rakaransha = 0, repaya = 0, hal_able = 1;
			var initMatches = text.match(Singlish.MARKUP_PATTERN);

			if(!initMatches) {
				// console.log('END?');
				return text;
			}

			if(initMatches[0].match(Singlish.CONSONANTS)) {
				var m = initMatches[0].match(Singlish.CONSONANTS);
				var consonant = null;

				if(initMatches[0].match(Singlish.NASALISED)) {
					// console.log('NASALISED', mN);
					consonant = initMatches[0].match(Singlish.NASALISED)[0];
				}
				else if(initMatches[0].match(Singlish.SP_CHARS)) {
					// console.log('SP_CHARS', mSC);
					consonant = initMatches[0].match(Singlish.SP_CHARS)[0];
				}
				else if(initMatches[0].match(Singlish.SP_CEREBRALS)) {
					// console.log('SP_CEREBRALS', mSR);
					consonant = initMatches[0].match(Singlish.SP_CEREBRALS)[0];
				}
				else if(initMatches[0].match(Singlish.CEREBRALS)) {
					// console.log('CEREBRALS', mC);
					consonant = initMatches[0].match(Singlish.CEREBRALS)[0];
				}
				else if(initMatches[0].match(Singlish.SP_CONSONANTS)) {
					// console.log('SP_CONSONANTS', mSO);
					consonant = initMatches[0].match(Singlish.SP_CONSONANTS)[0];
				}
				else  {
					// console.log('CONSONANTS', m);
					consonant = m[0];
				}

				var i_1 = text.indexOf(consonant) + consonant.length;

				let modifier = 0;
				var translit = consonant;

				if(text.charCodeAt(i_1) == 32) {
					hal_able = 1;
				}
				else if(text.substr(i_1).match(Singlish.SP_CHARS)) {
					modifier = text.substr(i_1).match(Singlish.SP_CHARS)[0];
					translit += modifier;
					hal_able = 0;
				}
				else if(text.charAt(i_1).match(Singlish.CONSONANTS)) {
					if(text.charAt(i_1) == 'r') {
						rakaransha = 1;
						translit += 'r';

						if(text.substr(i_1 + 1).match(Singlish.VOWELS)) {
							modifier = text.substr(i_1 + 1).match(Singlish.VOWELS)[0];
							translit += modifier;
							hal_able = 0;
						}
					}
				}
				else {
					if(text.charAt(i_1) == 'Y') {
						yansaya = 1;
						translit += 'Y';
					}
					if(text.substr(i_1).match(Singlish.VOWELS)) {
						modifier = text.substr(i_1).match(Singlish.VOWELS)[0];
						translit += modifier;
						hal_able = 0;
					}
				}

				if(consonant.match(/\\[nh]/)) {
					hal_able = 0;
				}

				if(consonant.startsWith('R')) {
					repaya = 1;
					consonant = consonant.replace(/^./, '');
				}

				var sinhala = (repaya ? literals['R'] : '')
							+ literals[consonant]
							+ (yansaya ? literals['Y'] : '')
							+ (rakaransha ? literals['rr'] : '')
							+ (literals['modifiers'][modifier ? modifier : hal_able ? 'hal' : 'none']);
				text = text.replace(translit, sinhala);
			}
			else {
				var translit = initMatches[0];

				text = text.replace(translit, literals[translit]);
			}
			
			i++;
		}
	}

	static get LITERALS() {
		return {
			aa:'\u0d86',
			Aa:'\u0d88',
			ii:'\u0d8a',
			uu:'\u0d8c',
			ee:'\u0d92',
			oo:'\u0d95',
			au:'\u0d96',
			a:'\u0d85',
			A:'\u0d87',
			i:'\u0d89',
			u:'\u0d8b',
			e:'\u0d91',
			o:'\u0d94',
			I:'\u0d93',

			modifiers: {
				oo:'\u0ddd',
				aa:'\u0dcf',
				Aa:'\u0dd1',
				ii:'\u0dd3',
				ee:'\u0dda',
				uu:'\u0dd6',
				au:'\u0dde',
				a:'',
				A:'\u0dd0',
				i:'\u0dd2',
				e:'\u0dd9',
				u:'\u0dd4',
				o:'\u0ddc',
				I:'\u0ddb',
				hal:'\u0dca',

				//Special characters
				Ru:'\u0dd8',
				Ruu:'\u0df2',
				none: ''
			},

			

			//Special consonants
			'\\n': '\u0d82',
			'\\h': '\u0d83',
			'\\N': '\u0d9e',
			'\\R': '\u0d8d',
			'\\J': '\u0da6',

			//Consonants
			k:'\u0d9a',
			K:'\u0d9b',
			g:'\u0d9c',
			G:'\u0d9d',
			nng:'\u0d9f',
			ch:'\u0da0',
			Ch:'\u0da1',
			j:'\u0da2',
			J:'\u0da3',
			KN:'\u0da4',
			GN:'\u0da5',
			t:'\u0da7',
			T:'\u0da8',
			d:'\u0da9',
			D:'\u0daa',
			N:'\u0dab',
			nnd:'\u0dac',
			th:'\u0dad',
			Th:'\u0dae',
			dh:'\u0daf',
			Dh:'\u0db0',
			n:'\u0db1',
			nndh:'\u0db3',
			p:'\u0db4',
			P:'\u0db5',
			b:'\u0db6',
			B:'\u0db7',
			m:'\u0db8',
			mmb:'\u0db9',
			y:'\u0dba',
			r:'\u0dbb',
			l:'\u0dbd',
			v:'\u0dc0',
			w:'\u0dc0',
			sh:'\u0dc1',
			Sh:'\u0dc2',
			s:'\u0dc3',
			h:'\u0dc4',
			L:'\u0dc5',
			Lu:'\u0dc5\u0dd4',
			f:'\u0dc6',
			kr: '\u0d9a\u0dca\u200d\u0dbb',

			Y:'\u0dca\u200d\u0dba',
			rr: '\u0dca\u200d\u0dbb',
			R: '\u0dbb\u0dca\u200d'
		};
	}
}