var sum_to_n_a = function(n) {
    // iterative (most intuitive)
    sum = 0;

    for (let i = 1; i <= n; i++){
        sum += i;
    }

    return sum
};

var sum_to_n_b = function(n) {
    // recursive
    
    // base case
    if(n == 0) return 0;
    return sum_to_n_b(n - 1) + n;
};

var sum_to_n_c = function(n) {
    // arithmatic progression (fastest)
    return (n * n + n) / 2;
};

