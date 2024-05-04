void main() {
  // 创建一个包含10个整数的列表
  List<int> numbers = List.generate(10, (index) => index);

  // 使用where方法过滤出偶数
  List<int> evenNumbers = numbers.where((number) => number % 2 == 0).toList();

  // 打印过滤后的偶数列表
  print(evenNumbers); // 输出：[0, 2, 4, 6, 8]
}