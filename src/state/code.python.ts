export default [
  {
    text: '# Program to check if a number is prime or not\n\n# Take input from the user\nnum = int(input("Enter a number: "))\n\n# prime numbers are greater than 1\nif num > 1:\n   # check for factors\n   for i in range(2,num):\n       if (num % i) == 0:\n           print(num,"is not a prime number")\n           print(i,"times",num//i,"is",num)\n           break\n   else:\n       print(num,"is a prime number")\n\n# if input number is less than\n# or equal to 1, it is not prime\nelse:\n   print(num,"is not a prime number")',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      'def smart_divide(func):\n' +
      '    def inner(a, b):\n' +
      '        print("I am going to divide", a, "and", b)\n' +
      '        if b == 0:\n' +
      '            print("Whoops! cannot divide")\n' +
      '            return\n' +
      '\n' +
      '        return func(a, b)\n' +
      '    return inner\n' +
      '\n' +
      '\n' +
      '@smart_divide\n' +
      'def divide(a, b):\n' +
      '    print(a/b)',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      '# Program to remove all whitespaces\n' +
      'import re\n' +
      '\n' +
      '# multiline string\n' +
      "string = 'abc 12\\\n" +
      "de 23 \\n f45 6'\n" +
      '\n' +
      '# matches all whitespace characters\n' +
      "pattern = '\\s+'\n" +
      '\n' +
      '# empty string\n' +
      "replace = ''\n" +
      '\n' +
      'new_string = re.sub(pattern, replace, string) \n' +
      'print(new_string)\n' +
      '\n' +
      '# Output: abc12de23f456\n',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      '# import module sys to get the type of exception\n' +
      'import sys\n' +
      '\n' +
      "randomList = ['a', 0, 2]\n" +
      '\n' +
      'for entry in randomList:\n' +
      '    try:\n' +
      '        print("The entry is", entry)\n' +
      '        r = 1/int(entry)\n' +
      '        break\n' +
      '    except:\n' +
      '        print("Oops!", sys.exc_info()[0], "occurred.")\n' +
      '        print("Next entry.")\n' +
      '        print()\n' +
      'print("The reciprocal of", entry, "is", r)',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      'class Polygon:\n' +
      '    def sides_no(self):\n' +
      '        pass\n' +
      '\n' +
      'class Triangle(Polygon):\n' +
      '    def area(self):\n' +
      '        pass\n' +
      '\n' +
      'obj_polygon = Polygon()\n' +
      'obj_triangle = Triangle()\n' +
      '\n' +
      'print(type(obj_triangle) == Triangle)   \t# true\n' +
      'print(type(obj_triangle) == Polygon)    \t# false\n' +
      '\n' +
      'print(isinstance(obj_polygon, Polygon)) \t# true\n' +
      'print(isinstance(obj_triangle, Polygon))\t# true',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      '# Python Program to calculate the square root\n' +
      '\n' +
      '# Note: change this value for a different result\n' +
      'num = 8 \n' +
      '\n' +
      '# To take the input from the user\n' +
      "#num = float(input('Enter a number: '))\n" +
      '\n' +
      'num_sqrt = num ** 0.5\n' +
      "print('The square root of %0.3f is %0.3f'%(num ,num_sqrt))",
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      '# Program to generate a random number between 0 and 9\n' +
      '\n' +
      '# importing the random module\n' +
      'import random\n' +
      '\n' +
      'print(random.randint(0,9))',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      '# Taking kilometers input from the user\n' +
      'kilometers = float(input("Enter value in kilometers: "))\n' +
      '\n' +
      '# conversion factor\n' +
      'conv_fac = 0.621371\n' +
      '\n' +
      '# calculate miles\n' +
      'miles = kilometers * conv_fac\n' +
      "print('%0.2f kilometers is equal to %0.2f miles' %(kilometers,miles))",
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
  {
    text:
      '# Solve the quadratic equation ax**2 + bx + c = 0\n' +
      '\n' +
      '# import complex math module\n' +
      'import cmath\n' +
      '\n' +
      'a = 1\n' +
      'b = 5\n' +
      'c = 6\n' +
      '\n' +
      '# calculate the discriminant\n' +
      'd = (b**2) - (4*a*c)\n' +
      '\n' +
      '# find two solutions\n' +
      'sol1 = (-b-cmath.sqrt(d))/(2*a)\n' +
      'sol2 = (-b+cmath.sqrt(d))/(2*a)\n' +
      '\n' +
      "print('The solution are {0} and {1}'.format(sol1,sol2))",
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
];
