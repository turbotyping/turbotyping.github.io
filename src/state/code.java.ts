// regex: \\n\\n(\s+) -> \\n$1\\n$1
export default [
  {
    text: 'import java.util.Scanner;\n\npublic class EvenOddNumber {\n    public static void main(String[] args) {\n        Scanner reader = new Scanner(System.in);\n        System.out.print("Enter a number: ");\n        int num = reader.nextInt();\n        if (num % 2 == 0) {\n            System.out.println(num + " is even");\n        } else {\n            System.out.println(num + " is odd");\n        }\n    }\n}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text: 'public class Fibonacci {\n    \n    public static void main(String[] args) {\n        \n        int n = 10, t1 = 0, t2 = 1;\n        System.out.print("First " + n + " terms: ");\n        \n        for (int i = 1; i <= n; ++i) {\n            System.out.print(t1 + " + ");\n            int sum = t1 + t2;\n            t1 = t2;\n            t2 = sum;\n        }\n    }\n}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text: 'public class HalfPyramid {\n  \n  public static void main(String[] args) {\n    int rows = 5;\n    \n    for (int i = 1; i <= rows; ++i) {\n      for (int j = 1; j <= i; ++j) {\n        System.out.print("* ");\n      }\n      System.out.println();\n    }\n  }\n}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text: 'public class FullPyramid {\n  \n  public static void main(String[] args) {\n    int rows = 5, k = 0;\n    \n    for (int i = 1; i <= rows; ++i, k = 0) {\n      for (int space = 1; space <= rows - i; ++space) {\n        System.out.print("  ");\n      }\n      \n      while (k != 2 * i - 1) {\n        System.out.print("* ");\n        ++k;\n      }\n      \n      System.out.println();\n    }\n  }\n}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text: 'public class Prime {\n  \n  public static void main(String[] args) {\n    \n    int num = 29;\n    boolean flag = false;\n    for (int i = 2; i <= num / 2; ++i) {\n      // condition for nonprime number\n      if (num % i == 0) {\n        flag = true;\n        break;\n      }\n    }\n    \n    if (!flag)\n      System.out.println(num + " is a prime number.");\n    else\n      System.out.println(num + " is not a prime number.");\n  }\n}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      'public class SwapNumbers {\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '\n' +
      '        float first = 1.20f, second = 2.45f;\n' +
      '\n' +
      '        System.out.println("--Before swap--");\n' +
      '        System.out.println("First number = " + first);\n' +
      '        System.out.println("Second number = " + second);\n' +
      '\n' +
      '        // Value of first is assigned to temporary\n' +
      '        float temporary = first;\n' +
      '\n' +
      '        // Value of second is assigned to first\n' +
      '        first = second;\n' +
      '\n' +
      '        // Value of temporary (which contains the initial value of first) is assigned to second\n' +
      '        second = temporary;\n' +
      '\n' +
      '        System.out.println("--After swap--");\n' +
      '        System.out.println("First number = " + first);\n' +
      '        System.out.println("Second number = " + second);\n' +
      '    }\n' +
      '}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      'public class AsciiValue {\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '\n' +
      "        char ch = 'a';\n" +
      '        int ascii = ch;\n' +
      '        // You can also cast char to int\n' +
      '        int castAscii = (int) ch;\n' +
      '\n' +
      '        System.out.println("The ASCII value of " + ch + " is: " + ascii);\n' +
      '        System.out.println("The ASCII value of " + ch + " is: " + castAscii);\n' +
      '    }\n' +
      '}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      'public class Largest {\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '\n' +
      '        double n1 = -4.5, n2 = 3.9, n3 = 2.5;\n' +
      '\n' +
      '        if( n1 >= n2 && n1 >= n3)\n' +
      '            System.out.println(n1 + " is the largest number.");\n' +
      '\n' +
      '        else if (n2 >= n1 && n2 >= n3)\n' +
      '            System.out.println(n2 + " is the largest number.");\n' +
      '\n' +
      '        else\n' +
      '            System.out.println(n3 + " is the largest number.");\n' +
      '    }\n' +
      '}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      'public class VowelConsonant {\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '\n' +
      "        char ch = 'i';\n" +
      '\n' +
      "        if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' )\n" +
      '            System.out.println(ch + " is vowel");\n' +
      '        else\n' +
      '            System.out.println(ch + " is consonant");\n' +
      '\n' +
      '    }\n' +
      '}',
    reference: 'https://www.programiz.com/java-programming/examples',
    author: 'Programiz',
  },
];
