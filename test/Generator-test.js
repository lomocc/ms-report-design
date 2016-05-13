/**
 * Created by vincent on 2016/4/25.
 */
import "babel-polyfill"

function* quips(name) {
    yield "hello " + name + "!";
    yield "i hope you are enjoying the blog posts";
    if (name.startsWith("X")) {
        yield "it's cool how your name starts with X, " + name;
    }
    yield "see you later!";
}
describe("Generator", ()=> {
    it("Generator", ()=> {
        var name = "X-liufeng";
        var iter = quips(name);
        var result;
        var strArr = [];
        while((result = iter.next(), !result.done)){
            console.log(result.value);
            strArr.push(result.value);
        }

        expect(strArr).toEqual(["hello " + name + "!",
            "i hope you are enjoying the blog posts",
            "it's cool how your name starts with X, " + name,
            "see you later!"]);
    })
})