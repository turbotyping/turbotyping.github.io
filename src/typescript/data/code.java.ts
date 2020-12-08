export default [
  {
    text:
      'public class Fibonacci {\n\n    public static void main(String[] args) {\n\n        int n = 10, t1 = 0, t2 = 1;\n        System.out.print("First " + n + " terms: ");\n\n        for (int i = 1; i <= n; ++i) {\n            System.out.print(t1 + " + ");\n            int sum = t1 + t2;\n            t1 = t2;\n            t2 = sum;\n        }\n    }\n}',
    reference: 'https://www.programiz.com/java-programming/examples/arraylist-string-conversion',
    author: 'Programiz',
  },
  {
    text:
      'public class HalfPyramid {\n\n  public static void main(String[] args) {\n    int rows = 5;\n\n    for (int i = 1; i <= rows; ++i) {\n      for (int j = 1; j <= i; ++j) {\n        System.out.print("* ");\n      }\n      System.out.println();\n    }\n  }\n}',
    reference: 'https://www.programiz.com/java-programming/examples/arraylist-string-conversion',
    author: 'Programiz',
  },
  {
    text:
      'public class FullPyramid {\n\n  public static void main(String[] args) {\n    int rows = 5, k = 0;\n\n    for (int i = 1; i <= rows; ++i, k = 0) {\n      for (int space = 1; space <= rows - i; ++space) {\n        System.out.print("  ");\n      }\n\n      while (k != 2 * i - 1) {\n        System.out.print("* ");\n        ++k;\n      }\n\n      System.out.println();\n    }\n  }\n}',
    reference: 'https://www.programiz.com/java-programming/examples/arraylist-string-conversion',
    author: 'Programiz',
  },
  {
    text:
      'public class Prime {\n\n  public static void main(String[] args) {\n\n    int num = 29;\n    boolean flag = false;\n    for (int i = 2; i <= num / 2; ++i) {\n      // condition for nonprime number\n      if (num % i == 0) {\n        flag = true;\n        break;\n      }\n    }\n\n    if (!flag)\n      System.out.println(num + " is a prime number.");\n    else\n      System.out.println(num + " is not a prime number.");\n  }\n}',
    reference: 'https://www.programiz.com/java-programming/examples/arraylist-string-conversion',
    author: 'Programiz',
  },
  {
    text:
      'import java.util.Scanner;\n\npublic class EvenOdd {\n\n    public static void main(String[] args) {\n\n        Scanner reader = new Scanner(System.in);\n\n        System.out.print("Enter a number: ");\n        int num = reader.nextInt();\n\n        if(num % 2 == 0)\n            System.out.println(num + " is even");\n        else\n            System.out.println(num + " is odd");\n    }\n}',
    reference: 'https://www.programiz.com/java-programming/examples/arraylist-string-conversion',
    author: 'Programiz',
  },
];
