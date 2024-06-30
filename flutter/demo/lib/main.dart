import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
        appBar: AppBar(
          title: const Text('Flutter Demo'),
        ),
        body: const MyApp()), // 这里应该是一个组件，比如一个Text组件
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
        child: Text(
      'Hello, world!',
      textDirection: TextDirection.ltr,
      style: TextStyle(fontSize: 45, color: Colors.purple),
    ));
  }
}
