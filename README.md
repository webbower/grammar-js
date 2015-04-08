# GrammarJS

A utility library for simplifying grammatical problems.

## API

**Note:** By default, everything is available under the top level `Grammar` object

### `fromStudlyCaps(string str)`

Splits a string formatted with Studly Caps (e.g. HelloWorldFromGrammar) into an array of words.

    Grammar.fromStudlyCaps('HelloWorldFromGrammar'); // ['Hello','World','From','Grammar']

### `fromCamelCase(string str)`

Splits a string formatted with Camel Came (e.g. helloWorldFromGrammar) into an array of words.

    Grammar.fromCamelCase('helloWorldFromGrammar'); // ['hello','World','From','Grammar']

### `fromSnakeCase(string str)`

Splits a string formatted with Snake Came (e.g. hello_world_from_grammar) into an array of words.

    Grammar.fromSnakeCase('hello_world_from_grammar'); // ['hello','world','from','grammar']

### `fromSlug(string str)`

Splits a string formatted as a Slug (e.g. hello-world-from-grammar) into an array of words.

    Grammar.fromSlug('hello-world-from-grammar'); // ['hello','world','from','grammar']

### `toStudlyCaps(array words)`

Converts an array of words into a Studly Caps string

    Grammar.toStudlyCaps(['Hello','world','from','Grammar']); // HelloWorldFromGrammar

### `toCamelCase(array words)`

Converts an array of words into a Camel Case string

    Grammar.toCamelCase(['Hello','world','from','Grammar']); // helloWorldFromGrammar

### `toSnakeCase(array words)`

Converts an array of words into a Snake Case string

    Grammar.toSnakeCase(['Hello','world','from','Grammar']); // hello_world_from_grammar

### `toSlug(array words)`

Converts an array of words into a Slug formatted string

    Grammar.toSlug(['Hello','world','from','Grammar']); // hello-world-from-grammar

### `words(string str)`

Converts a string into an array of words using English word boundary rules (splits on whitespace). No punctuation is stripped. It is kept along with its associated word.

    Grammar.words('And so, he said to her "Check out this pineapple," and she was stoked!'); // ['And', 'so,', 'he', 'said', 'to', 'her', '"Check', 'out', 'this', 'pineapple,"', 'and', 'she', 'was', 'stoked!']

### `pluralize(string zero, string one, string many, number count)`

Outputs a specific string based on the `count` argument:

* If `count` is `0`, it returns the `zero` string.
* If `count` is `1`, it returns the `one` string.
* If `count` is greater than `1`, it returns the `many` string.
* If `count` is a negative number, a `RangeError` is thrown.
* If `count` is a fractional number, it is passed through `parseInt(count, 10)` to convert it to a whole, base-10.

Any instances of the sub-string `"{0}"` found in `zero`, `one`, or `many` are replaced with `count`.

    Grammar.pluralize('No comments', '{0} comment', '{0} comments', 0); // No comments
    Grammar.pluralize('No comments', '{0} comment', '{0} comments', 1); // One comments
    Grammar.pluralize('No comments', '{0} comment', '{0} comments', 247); // 247 comments

## Configuration

If a top-level `GrammarConfig` POJO is found, its keys will override the default configuration of GrammarJS. Once the values in the top-level `GrammarConfig` are merged in, it is set to `undefined` to clean up after itself. The configuration keys are as follows:

### `bindToNatives: <boolean>` (default `false`)

GrammarJS can bind its functions to the appropriate native JavaScript prototypes so you can chain with them. The methods will be bound with a prefix (defined with the `nativesPrefix` configuration value) to avoid collisions.

String:

* `fromStudlyCaps()`
* `fromCamelCase()`
* `fromSnakeCase()`
* `fromSlug()`
* `words()`

Array: 

* `toStudlyCaps()`
* `toCamelCase()`
* `toSnakeCase()`
* `toSlug()`

Number:

* `pluralize(string zero, string one, string many)`

Yes, I know modifying the natives is generally perceived as bad, but I disagree (to be written about later), which is why this feature is opt-in for now.

### `nativesPrefix: <string>` (default `'gr'`)

If you enable binding the GrammarJS functions to their appropriate natives, this will set the prefix for the functions. For example (assuming `nativesPrefix` is unmodified), you would call the methods like `grWords()` and `grToStudlyCaps()`. You can set `nativesPrefix` to `null` to have the functions bound as they are named, without a prefix.

## TODO

* Add LICENSE file
* Add argument validation to functions
* Add unit tests
* Finish `sentences` function
* Post to Bower and NPM repos
