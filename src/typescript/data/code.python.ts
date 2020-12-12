export default [
  {
    text:
      '# Program to check if a number is prime or not\n\n# Take input from the user\nnum = int(input("Enter a number: "))\n\n# prime numbers are greater than 1\nif num > 1:\n   # check for factors\n   for i in range(2,num):\n       if (num % i) == 0:\n           print(num,"is not a prime number")\n           print(i,"times",num//i,"is",num)\n           break\n   else:\n       print(num,"is a prime number")\n\n# if input number is less than\n# or equal to 1, it is not prime\nelse:\n   print(num,"is not a prime number")',
    reference: 'https://www.programiz.com/python-programming/examples',
    author: 'Programiz',
  },
];
