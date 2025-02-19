const formatCurrency = (value) => {
    var convertCurrency = function e(t, a, r) {
        var n = t / 1e5
            , o = "";
        if (t >= 1e10)
            return t;
        if (n >= .01 && n < 1) {
            var i = f(100 * n);
            o = "".concat(i, " k")
        } else if (n >= 1 && n < 100) {
            var c = f(n);
            o = "".concat(c, c > 1 && !r ? " Lacs" : " Lac")
        } else if (n >= 100) {
            var s = f(n / 100)
                , l = s >= 1e5 ? e(s, a, !0) : s;
            o = "".concat(l, " Cr")
        } else
            o = f(+t);
        return o
    }

    var f = function (e) {
        return +e.toLocaleString(void 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    };

    const convertedVal = convertCurrency(Number(value));
    return convertedVal;
}

export default formatCurrency;