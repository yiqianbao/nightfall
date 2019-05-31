#.pcode

##Syntax discussed here: `....` (4 dots) `500....123` - copy number 500 times `500....abc123` - copy
string 500 times `...` (3 dots)  
`a63...0` - decreasing repetition of variable `b63...32` - decreasing repetition of variable
`'field' £a63...0` - decreasing repetition of parameter declarations `)->(field64):` - declare
number and type of function outputs `[*]63...0` - decreasing repetition of a phrase, in a
comma-separated in-line format  
`[ * [ *# ]127...0 ]63...0` - nesting of the above `{*}63...0` - decreasing repetition of a phrase,
in a new-line-separated format `{ * { *# }127...0 }63...0` - nesting of the above `z==63...0==Z` -
decreasing repetition of equality checks

## Repeat string/value

`....` (4 dots)

Results in constant repetition of a string. This was inspired by the need to add padding with
hundreds of 0's. E.g.

- `128....0`

will produce a string `0, 0, 0,`...`, 0, 0` (128 0's separated by commas) or

- `4....word01`

will produce a string of `word01, word01, word01, word01` (4 words separated by commas)

## Ellipsis

Ellipsis `...` (3 dots) are syntax for 'decreasing repetition'. There are a few different ways to
use ellipsis:

### Declaring Variables - Decreasing Variable Repetition Syntax

#### `a63...0`

_WARNING: see the next section for declaring parameters to functions_

Type declarations aren't needed in the _body_ of a .code file. Decreasing repetition syntax: E.g.

- `a63...0` expands out to:

`a63, a62,..., a1, a0`

E.g.

- `a63...32` expands out to:

`a63, a62,..., a33, a32`

### Declaring Parameters (within functions) - Decreasing Parameter Repetition Syntax

#### `'field' £a63...0`

The 'new' zokrates (as at November 2018) requires 'type' declaration of function parameters.
ZoKrates types are: `field`, `field[n]`, `bool` (bool is dodgy and only has limited functionality).
We currently use `field` all of the time.

**_Without_** .pcode syntax (i.e. using regular .code syntax) a function declaration would be as
follows:

E.g.
`def main(field a, private field b2, private field b1, private field b0)->(field, field, field, field, field, field, field, field):`

where `a` is a public input of type `field`, and `b2, b1, b0` are private inputs of type `field`.

You **must** now always specify the number and type of all output values. The section
`->(field, field, field, field, field, field, field, field):` specifies that the function returns 8
values of type `field`.

**_With_** .pcode syntax, the above can be abbreviated to:

- `def main(field a, 'field' £b2...0)->(field8):`

where: `b2...0` denotes decreasing repetition to `b2, b1, b0` `£` denotes `private` parameters
`field` is standard .code syntax `'field'` (_with_ inverted commas `''`) denotes the type to
repeatedly apply to a Decreasing Repetition Syntax `£b2...0` `)->(field8):` _NOTE NO SPACES from the
closing bracket through to `:`_. This is syntax which expands to
`->(field, field, field, field, field, field, field, field):`

### Lazy expansion of phrases - Decreasing Phrase Repetition Syntax

#### Comma-separated repetition of phrases `[*]63...0`:

E.g.

- `return [XOR(a*, b*, c0)]3...0`

is .pcode syntax which expands to .code syntax:

`return XOR(a3, b3, c0), XOR(a2, b2, c0), XOR(a1, b1, c0), XOR(a0, b0, c0)`

E.g.

- `return [a*, b2...0]3...0`

will first expand the outside brackets to: `a3, b2...0, a2, b2...0, a1, b2...0, a0, b2...0` And
secondly then to: `a3, b2, b1, b0, a2, b2, b1, b0, a1, b2, b1, b0, a0, b2, b1, b0`

Note that the brackets to return a comma-separated phrase expansion are SQUARE

#### `[ * [ *# ]127...0 ]63...0` - nesting of the above (comma separation)

This enables nesting of `[ * [ *# ]]` (only one level of nesting): First the standalone `*` is
replaced with a number. Then the `*#` is replaced with `*`. Then on the next pass, the newly created
`*` is replaced with a number.

E.g.

See the similar section on squiggly brackets for a set of similar examples.

#### New-Line repetition of phrases `{*}63...0`:

Similar to the above comma-separation syntax, except instead of outputting a comma-separated list,
it outputs the data separated by new lines.

E.g. complicated variable expansion:

- `{a*b63...0}7...0`

will first expand the outside ellipsis to give: `a7b63...0` `a6b63...0`  
...

`a0b63...0`

And secondly then to: `a7b63, a7b62, a7b61,..., a7b0` `a6b63, a6b62, a6b61,..., a6b0` ...

`a0b63, a0b62, a0b61,..., a0b0`

E.g. complicated expression expansion:

- `{c*b127...0 = unpack128(c*b)}7...0`

will first expand the outside ellipsis to give: `c7b127...0 = unpack128(c7b)`
`c6b127...0 = unpack128(c6b)` ...

`c1b127...0 = unpack128(c1b)`  
`c0b127...0 = unpack128(c0b)`

And secondly then to: `c7b127, c7b126, c7b125,`...`, c7b2, c7b1, c7b0 = unpack128(c7b)`
`c6b127, c6b126, c6b125,`...`, c6b2, c6b1, c6b0 = unpack128(c6b)` ...

`c1b127, c1b126, c1b125,`...`, c1b2, c1b1, c1b0 = unpack128(c0b)`
`c0b127, c0b126, c0b125,`...`, c0b2, c0b1, c0b0 = unpack128(c0b)`

Powerful!

E.g. multi-line complicated expression expansion:

- `{t63...0 = XOR2x64(c63...0, c*b63...0)` `t511...0 = PAD64to512(t63...0)`
  `c255...0 = sha256compression(t511...0)}6...1`

will first expand the outside ellipsis to give:  
`t63...0 = XOR2x64(c63...0, c6b63...0)` `t511...0 = PAD64to512(t63...0)`
`c255...0 = sha256compression(t511...0)`

`t63...0 = XOR2x64(c63...0, c5b63...0)` `t511...0 = PAD64to512(t63...0)`
`c255...0 = sha256compression(t511...0)` ...

`t63...0 = XOR2x64(c63...0, c2b63...0)` `t511...0 = PAD64to512(t63...0)`
`c255...0 = sha256compression(t511...0)`

`t63...0 = XOR2x64(c63...0, c1b63...0)` `t511...0 = PAD64to512(t63...0)`
`c255...0 = sha256compression(t511...0)`

And secondly then to: `t63, t62,`... `t2, t1, t0 = XOR2x64(c63, c62,`...
`c2, c1, c0, c6b63, c6b63,`...`c6b1, c6b0)`
`t511, t510,`...`t2, t1, t0 = PAD64to512(t63, t62,`...`t1, t0)`
`c255, c254,`...`c2, c1, c0 = sha256compression(t511, t510,`...`t1, t0)`

`t63, t62,`... `t2, t1, t0 = XOR2x64(c63, c62,`... `c2, c1, c0, c5b63, c5b63,`...`c5b1, c5b0)`
`t511, t510,`...`t2, t1, t0 = PAD64to512(t63, t62,`...`t1, t0)`
`c255, c254,`...`c2, c1, c0 = sha256compression(t511, t510,`...`t1, t0)` ...

`t63, t62,`... `t2, t1, t0 = XOR2x64(c63, c62,`... `c2, c1, c0, c2b63, c2b63,`...`c2b1, c2b0)`
`t511, t510,`...`t2, t1, t0 = PAD64to512(t63, t62,`...`t1, t0)`
`c255, c254,`...`c2, c1, c0 = sha256compression(t511, t510,`...`t1, t0)`

`t63, t62,`... `t2, t1, t0 = XOR2x64(c63, c62,`... `c2, c1, c0, c1b63, c1b63,`...`c1b1, c1b0)`
`t511, t510,`...`t2, t1, t0 = PAD64to512(t63, t62,`...`t1, t0)`
`c255, c254,`...`c2, c1, c0 = sha256compression(t511, t510,`...`t1, t0)`

Note that the brackets to return a new-line-separated phrase expansion are SQUIGGLY

#### `{ * { *# }127...0 }63...0` - nesting of the above (new line separation)

This enables nesting of `{ * { *# }}` (only one level of nesting): First the standalone `*` is
replaced with a number. Then the `*#` is replaced with `*`. Then on the next pass, the newly created
`*` is replaced with a number.

E.g. (noddy example)

```
{ X* = A* + B*
{ Y*# = C*# + D* }127...0 }63...0
```

will first expand the standalone `*`, and replace `*#` with `*` to become:

```
X63 = A63 + B63
{ Y* = C* + D63 }127...0

X62 = A62 + B62
{ Y* = C* + D62 }127...0

//etc.

X0 = A0 + B0
{ Y* = C* + D0 }127...0
```

and will then expand the newly created standalone `*`:

```
X63 = A63 + B63
Y127 = C127 + D63
Y126 = C126 + D63
//etc.
Y0 = C0 + D63

X62 = A62 + B62
Y127 = C127 + D63
Y126 = C126 + D63
//etc.
Y0 = C0 + D63

//etc.

X0 = A0 + B0
Y127 = C127 + D63
Y126 = C126 + D63
//etc.
Y0 = C0 + D63
```

E.g. (real world example)

```
{ isZero = ISZERO64x64(t63...0, d*b63...0)
t63...0 = XOR2x64(t63...0, d*b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
{t*# = if isZero==1 then 0 else t*# fi }255...0 }31...1
```

will first expand the standalone `*`, and replace `*#` with `*` to become:

```
isZero = ISZERO64x64(t63...0, d31b63...0)
t63...0 = XOR2x64(t63...0, d31b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
{t* = if isZero==1 then 0 else t* fi }255...0

isZero = ISZERO64x64(t63...0, d30b63...0)
t63...0 = XOR2x64(t63...0, d30b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
{t* = if isZero==1 then 0 else t* fi }255...0

//etc.

isZero = ISZERO64x64(t63...0, d0b63...0)
t63...0 = XOR2x64(t63...0, d0b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
{t* = if isZero==1 then 0 else t* fi }255...0
```

will secondly expand the newly created `*` to become:

```
isZero = ISZERO64x64(t63...0, d31b63...0)
t63...0 = XOR2x64(t63...0, d31b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
t255 = if isZero==1 then 0 else t255 fi
t254 = if isZero==1 then 0 else t254 fi
//etc...
t0 = if isZero==1 then 0 else t0 fi

isZero = ISZERO64x64(t63...0, d30b63...0)
t63...0 = XOR2x64(t63...0, d30b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
t255 = if isZero==1 then 0 else t255 fi
t254 = if isZero==1 then 0 else t254 fi
//etc...
t0 = if isZero==1 then 0 else t0 fi

//etc.

isZero = ISZERO64x64(t63...0, d0b63...0)
t63...0 = XOR2x64(t63...0, d0b63...0)
t511...0 = shaPad64To512(t63...0)
t255...0 = sha256compression(t511...0)
t255 = if isZero==1 then 0 else t255 fi
t254 = if isZero==1 then 0 else t254 fi
//etc.
t0 = if isZero==1 then 0 else t0 fi
```

And then finally the standard ellipsis notation `...` will be expanded.

#### Repetition of equality checks `z==63...0==Z`:

E.g.

- `z==63...0==Z`

will expand to: `z0==Z0` `z1==Z1` ... `z62==Z62` `z63==Z63`

Note: this could also be achieved now with:

E.g.

- `{z*==Z*}63...0`

will expand to: `z63==Z63` `z62==Z62` ... `z1==Z1` `z0==Z0`
