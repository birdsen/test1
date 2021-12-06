# 说明

1、文档中的所有图片大部分均通过picgo插件上传至了gitee，配置picgo时的私人令牌为：f944d6edfff6cc037c0048565c8521ba。

2、对于上传至gitee的图片，不能通过右键-在浏览器中打开的方式查看，因为浏览器会执行图片下载，而有些没有上传到gitee的图片，可以在浏览器中打开，这样就能放大来看。（因为这里设置了图片自动上传，所以如果想保留图片的原始链接地址，就复制两次图片，第一次复制图片到这里会自动上传，第二次就会上传失败，所以就能保留源地址了）

3、本文档是在准备java招聘的过程中做的笔记，所以内容涵盖很广。至于java单方面的详细知识（包括java、web、spring全家桶），可以参考[廖雪峰老师的官网](https://www.liaoxuefeng.com/wiki/1252599548343744)。



4、以下为[尚硅谷公开的JAVA视频最快学习路线](https://www.bilibili.com/read/cv5216534?spm_id_from=333.788.b_636f6d6d656e74.5)： 

>JavaSE -->MySQL基础 --> JDBC --> JavaWeb --> [Spring5](https://www.bilibili.com/video/BV1Vf4y127N5?p=3) --> SpringMVC --> MyBatis --> Maven --> Ssm框架整合案例 --> Git/GitHub --> Redis6 --> MySQL高级优化 --> MyBatisPlus --> Spring注解驱动开发 --> ZooKeeper --> Dubbo --> 消息中间件ActiveMQ --> RabbitMQ -->SpringBoot2 --> SpringCloud --> 尚筹网项目 --> 在线教育项目 --> 谷粒商城项目 --> 尚医通项目 --> 尚融宝项目--> 高频面试题第一季 --> 大厂面试题第二季 --> 大厂面试题第三季

# JAVA语言

##  Java基础

> 更多详细内容参见：https://blog.csdn.net/PorkBird/article/details/113666542

### 概念

​	JDK = JRE + 开发工具集（例如Javac编译工具等）

​	JRE = JVM + Java SE标准类库

<img src="https://img-blog.csdnimg.cn/img_convert/c66193345f2d1a177603d354d48907a0.png" alt="img" style="zoom:50%;" />

### 基础的细节

1、Java应用程序的执行入口是main()方法。它有固定的书写格式：public static void main(String[] args) {…}

2、一个源文件中最多只能有一个public类。其它类的个数不限，如果源文件包含一个public类，则文件名必须按该类名命名。

### 常量池

​	Java中的常量池，实际上分为两种形态：**静态常量池**和**运行时常量池**。

>所谓**静态常量池**，即*.class文件中的常量池，class文件中的常量池不仅仅包含字符串(数字)字面量，还包含类、方法的信息，占用class文件绝大部分空间。这种常量池主要用于存放两大类常量：字面量(Literal)和符号引用量(Symbolic References)，字面量相当于Java语言层面常量的概念，如文本字符串，声明为final的常量值等，符号引用则属于编译原理方面的概念，包括了如下三种类型的常量：类和接口的全限定名、字段名称和描述符、方法名称和描述符。
>
>
>
>而**运行时常量池**，则是jvm虚拟机在完成类装载操作后，将class文件中的常量池载入到内存中，并保存在方法区中，我们常说的常量池，就是指方法区中的运行时常量池。

​	常量池一般指运行时常量池（Runtime Constant Pool），它是方法区的一部分。此区域会在两种情况下存储数据：
​	（1）编译期生成的各种字面值和常量，这部分内容在类被加载后存放到方法区的运行时常量池中。它里面包括final常量的值（包括成员常量、局部常量和引用常量）、以及对象字面量的值。
​	（2）运行期间生成的常量，比如String类的intern()方法，String str = "abc".intern();当运行时常量池中存在字符串"abc时，将该字符串的引用返回，赋值给str，否则创建字符串"abc"，加入运行时常量池中，并返回引用赋值给str。

> **final常量**：一切经final关键字修饰的变量均为常量，final修饰的变量在编译后会直接替换成对应的值，final常量必须在定义时就赋初值，否则编译不通过。
>
> **对象字面量**：指直接以一常量给对象赋值，而不是在堆空间new出一个对象实例。常见的两种对象字面量：基本类型的包装类对象字面量、String对象字面量。（字面量的意思是说,在编译期间就直接指定了实际值，这意味着当没有使用字面量而是使用 new关键字时,对象将直接进入堆区而不会进入常量池）
>
> > （1）包装类赋值字面量时，会先检查缓存，缓存中有则直接用，没有就新建，可复用的只有[-128,127]范围内的对象，超出范围的都是新建的对象，哪怕两个对象的值相等，它依然是两个对象比如，Integer a=1000; Integer b=1000; System.out.println(a==b); 是false。
> >
> > （2）直接以字面量给string对象赋值，会先去检查常量池中是否存在该值，若存在直接返回该值的地址，若不存在则先在常量池中创建该值，再返回该值的地址。	
> >
> > （3）综上，string的常量池并不像包装类的常量池一样会准备一些可复用的对象出来，且string的常量池可以扩充，而包装类似乎不能扩充。详情如下：
> >
> > ​		String类型的所有字面量都会进入常量池
> > ​		Byte 、Short 、Integer 、Long 四种类型字面量在大于等于 -128 且小于等于127 时对象将进入常量池（言外之意就是不能扩充）
> > ​		Character 类型 不能为负数,字面量大于等于0 且 小于等于127时对象将进入常量池
> > ​		Boolean类型 两个字面量都会进入常量池
> > ​		Float 和Double 类型 不会进入常量池
>
> 关于常量池的更多内容会在下面的包装类和string中介绍。



### 包装类

参考https://blog.csdn.net/u011480603/article/details/75364931 和 https://zhuanlan.zhihu.com/p/82916989

1、Java有**8种基本类型**：大致分为3类：字符，布尔，数值类型（在java中数值是不存在无符号的，这一点不像C/C++，他们的取值范围是固定的，不会随着机器硬件的环境或者操作系统的改变而改变），他们**都有对应的包装类**。

2、Java**基本类型存储在栈中**，因此它们的存取速度要快于存储在堆中的对应包装类的实例对象。

3、从Java5.0（1.5）开始，JAVA虚拟机（Java Virtual Machine）可以完成基本类型和它们对应包装类之间的**自动转换**。因此我们在赋值、参数传递以及数学运算的时候像使用基本类型一样使用它们的包装类，但这并不意味着你可以通过基本类型调用它们的包装类才具有的方法。

> **自动装箱**：如 Integer a = 1 。Integer a = 1 其实相当于 Integer a = Integer.valueOf(1)，Integer.valueOf(int)返回Integer对象。
>
> **自动拆箱**：如 int b=a 。int b=a 其实相当于 int b=a.intValue();

```java
Integer i4 = new Integer(40);
Integer i5 = new Integer(40);
Integer i6 = new Integer(0);
System.out.println("i4=i5   " + (i4 == i5)); //false，因为i4和i5是在堆空间创建的两个对象
System.out.println("i4=i5+i6   " + (i4 == i5 + i6));  //true，因为+这个操作符不适用于Integer对象，首先i5和i6进行自动拆箱操作，进行数值相加，即i4 == 40。然后Integer对象无法与数值进行直接比较，所以i4自动拆箱转为int值40，最终这条语句转为40 == 40进行数值比较。
System.out.println("40=i5+i6   " + (40 == i5 + i6)); //true，理由同上，详情参考下面第7条
```

4、所有基本类型（包括void）的包装类都使用了final修饰，因此我们**无法继承**它们扩展新的类，也**无法重写**它们的任何方法。

5、**包装类型出现的原因**
	Java是一个面向对象的语言，基本类型并不具有对象的性质，为了与其他对象“接轨”就出现了包装类型（如我们在使用集合类型Collection时就一定要使用包装类型而非基本类型），它相当于将基本类型“包装起来”，使得它具有了对象的性质，并且为其添加了属性和方法，丰富了基本类型的操作。

6、**基本类型和包装类型的区别**：
	各自的优势：基本类型的数据存储相对简单，运算效率比较高。包装类的满足了集合等数据结构的元素必须是对象类型的要求，满足了java一切皆是对象的思想
	声明方式不同：基本类型不使用new关键字，而包装类型需要使用new关键字来在堆中分配存储空间；
	存储方式及位置不同：基本类型是直接将变量值存储在栈中，而包装类型是将对象放在堆中，然后通过引用来使用；
	初始值不同：基本类型的初始值如int为0，boolean为false，而包装类型的初始值为null

7、**包装类中“==”与equals的用法比较**

​	值得注意的是，包装类中的equals方法和String类一样，都是重写了Object类中的equals方法，因此比较的是内容而不是地址。
​	而 “==” 比较基本数据类型是值比较，但比较引用类型则是引用所指向的地址比较，**当包装类型和与之相对应的基本类型进行“ ==” 比较时会先做自动拆箱处理**。

8、**包装类缓存**（常量池）

​	除两种浮点型外，其他的包装类都提供了对象的缓存，实现方式是在类初始化时提前创建好会**频繁使用的包装类对象**，当需要使用某个包装类的对象时，使用字面量赋值或valueOf赋值即可（new出来的不行），如果该对象包装的值在缓存的范围内（-128~127），就返回缓存的对象，否则就创建新的对象并返回。

> 可以看到，使用字面量赋值或valueOf赋值时，会先访问常量池，而不是立即new，常量池没有才new，所以使用字面量或者valueOf方法都可以利用常量池

```java
System.out.println(Integer.valueOf("128")==Integer.valueOf("128"));    --false //因为128不属于[-128, 127]集合范围内
System.out.println(Integer.valueOf("127")==Integer.valueOf("127"));   --true
System.out.println(Integer.valueOf("-128")==Integer.valueOf("-128"));   --true  
```

```java
Integer a=1000; 
Integer b=1000;
System.out.println(a==b); //false，这里要特别注意，和string是不一样的，string可以动态地扩充常量池，但是包装类不可以，包装类超出缓存范围就会始终创建新对象

Integer a1=Integer.valueOf(1000); 
Integer b1=Integer.valueOf(1000);
System.out.println(a1==b1); //false，前面说过了，字面量赋值和valueOf赋值是等价的。valueOf方法能够返回包装类对象

Integer a2=Integer.valueOf(1); 
Integer b2=Integer.valueOf(1);
System.out.println(a2==b2); //true ，因为1在[-128,127]范围内

Integer a3=new Integer(1); 
Integer b3=new Integer(1);
System.out.println(a3==b3); //false ，new出来的一定是新对象，所以两个一定不一样
```



### String

1、string的length是方法（要加括号），而数组的length是属性（不用加括号）。
2、 String声明为final的，不可被继承。
	String实现了Serializable接口，表示字符串是支持序列化的。
	String实现了Comparable接口，表示String可以比较大小。
	String内部定义了final char[] value用于存储字符串数据。

>在 Python 和 Java 等语言中，字符串都被设计成不可变的类型，即无法直接修改字符串的某一位字符。而在 C++ 语言中， string 被设计成可变的类型。

3、字符串常量池
	通过字面量的方式（区别于new）给一个字符串赋值，此时的字符串值声明在字符串常量池中。字符串常量池中是不会存储相同内容的字符串的。
	字符串常量存储在字符串常量池，目的是共享。字符串非常量对象存储在堆中。

```java
    String s1 = "javaEE";//通过字面量赋值创建字符串时，会先在常量池中查找是否存在相同的字符串，若存在，则将栈中的引用直接指向该字符串；若不存在，则在常量池中生成一个字符串，再将栈中的引用指向该字符串
    String s2 = "javaEE";
    String s3 = new String("javaEE");//通过new + 构造器的方式:此时的s3和s4保存的地址值，是数据在堆空间中开辟空间以后对应的地址值。
    String s4 = new String("javaEE");
    String s3_1=s3.intern();//当调用 intern() 方法时，编译器会将字符串添加到常量池中（stringTable维护），并返回指向该常量的引用。
    System.out.println(s1 == s2);//true
    System.out.println(s1 == s3);//false
    System.out.println(s1 == s4);//false
    System.out.println(s3 == s4);//false ，但s3.equals(s4)是true
    System.out.println(s1 == s3_1);//true
    
    final String s5 = "javaEE"; //常量，final修饰的变量在编译后会直接替换成对应的值
    String s6="javaEESQL";
    System.out.println(s6 == s5+"SQL");//true，常量与常量的拼接结果在常量池。且常量池中不会存在相同内容的常量。
    System.out.println(s6 == s1+"SQL");//false，只要其中有一个是变量，结果就在堆中
    
    Person p1 = new Person("Tom",12);
    Person p2 = new Person("Tom",12);
    System.out.println(p1.name.equals(p2.name));//true
    System.out.println(p1.name == p2.name);//true，这里是true，但是上面s3==s4却是false，为什么？看下图（p1.name和p2.name中的内容，即地址值是一样的）
```
<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20200509201810827.png" alt="img" style="zoom:50%;" />            <img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20200509201833464.png" alt="img" style="zoom:50%;" />

4、String与基本数据类型/包装类的转换

```java
	String str1 = "123";
	int num = Integer.parseInt(str1); //int num = (int)str1;是错误的

	String str2 = String.valueOf(num);   //基本数据类型转换为string的第一种方式
	String str3 = num + "";  //基本数据类型转换为string的第二种方式
	System.out.println(str1 == str3);   //false
```
5、String与char[]之间的转换

```java
    String str1 = "abc123"; 
    char[] arr = str1.toCharArray(); //string → char[]
    String str2 = new String(arr); //char[] → string（string可以由char[]来构造，但不能由int来构造）
```
6、String常用方法

（1）charAt：获取字符，如 char item=s.charAt(i);
（2）substring：截取，左闭右开，如 System.out.println(s.substring(2,4));
（3）indexOf：返回字符串第一次出现的位置索引，如 System.out.println(s.indexOf("23"));//没有则返回-1
（4）equals
（5）toLowerCase()、toUpperCase()

### StringBuilder

​	StringBuilder 类在 Java 5 中被提出，它和 StringBuffer 之间的最大不同在于 StringBuilder 的方法不是线程安全的（不能同步访问）。由于 StringBuilder 相较于 StringBuffer 有速度优势，所以多数情况下建议使用 StringBuilder 类。

> 在刷题的过程中发现，用StringBuilder比直接用String的性能好。

```java
StringBuilder sb = new StringBuilder(10);        
sb.append("Runoob..");        System.out.println(sb);    //Runoob..      
sb.append("!");        System.out.println(sb);           //Runoob..!
sb.insert(8, "Java");        System.out.println(sb);     //Runoob..Java!     
sb.delete(5,8);        System.out.println(sb);			//RunooJava!（删除了下标[5,8)的元素，左闭右开）
System.out.println(sb.reverse());//!avaJoonuR
//此外也有charAt()、indexOf()、replace()等方法
```

### Arrays

​	java.util.Arrays类即为操作数组的工具类，包含了用来操作数组（比如排序和搜索）的各种方法：
（1）boolean equals(int[] a,int[] b)	判断两个数组是否相等。如，boolean isEquals = Arrays.equals(arr1, arr2);
（2）String toString(int[] a)	输出数组信息。
（3）void fill(int[] a,int val)	将指定值填充到数组之中。
（4）void sort(int[] a)	对数组进行排序。降序的话是Arrays.sort(a,Collections.reverseOrder());//此时a不能是基本数据类型，而应该是对应的包装类

> Comparator.reverseOrder()和Collections.reverseOrder()在这里都可以，很多地方这两个都是通用的。但是a里面的元素不能是基本数据类型。

（5）int binarySearch(int[] a,int key)	对排序后的数组进行二分法检索指定的值。

### 集合

Java 集合可分为Collection和Map两种体系

​	Collection接口：单列数据，定义了存取一组对象的方法的集合，存储一个一个的数据。
​		List：元素可重复的集合
​		Set：元素不可重复的集合
​	Map接口：双列数据，保存具有映射关系“key-value对”的集合，存储一对一对的数据。

#### collection

1、collection接口继承树

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/4a9d3171541866ba77e2291ce41e9962.png" alt="img" style="zoom: 50%;" />

2、Collection接口中的常用方法
	添加
		add(Objec tobj)
		addAll(Collection coll)
	获取有效元素的个数
		int size()
	清空集合
		void clear()
	是否是空集合
		boolean isEmpty()
	是否包含某个元素
		boolean contains(Object obj)：是通过元素的equals方法来判断是否是同一个对象
		boolean containsAll(Collection c)：也是调用元素的equals方法来比较的。拿两个集合的元素挨个比较。
	删除
		boolean remove(Object obj) ：通过元素的equals方法判断是否是要删除的那个元素。只会删除找到的第一个元素
		boolean removeAll(Collection coll)：取当前集合的差集
	取两个集合的交集
		boolean retainAll(Collection c)：把交集的结果存在当前集合中，不影响c
	集合是否相等
		boolean equals(Object obj)
	转成对象数组
		Object[] toArray()：比如list.toArray(arr1);此时arr1就有了list中的值了，再比如return res.toArray(new String[res.size()]);
	获取集合对象的哈希值
		hashCode()
	遍历
		iterator()：返回迭代器对象，用于集合遍历

> 迭代器和c++中的概念类似，只不过操作上不太一样。
>
> Iterator对象称为迭代器(设计模式的一种)，主要用于遍历Collection 集合中的元素。
>
> GOF给迭代器模式的定义为：提供一种方法访问一个容器(container)对象中各个元素，而又不需暴露该对象的内部细节。
>
> 迭代器 it 的基本操作是 next 、hasNext 和 remove。（通过Iterator<String> it = coll.iterator();来获取迭代器）
>
> ​	调用 it.next() 会返回迭代器的下一个元素，并且更新迭代器的状态。
>
> ​	调用 it.hasNext() 用于检测集合中是否还有元素。
>
> ​	调用 it.remove() 将迭代器返回的元素删除。
>
> 一般不常用迭代器，而是用for-each循环来取数据，如：for(String s : coll){...}

3、List接口

（1）|----List接口：存储有序的、可重复的数据。  -->“动态”数组,替换原有的数组
		|----ArrayList：作为List接口的主要实现类；线程不安全的，效率高；底层使用Object[] elementData存储
		|----LinkedList：对于频繁的插入、删除操作，使用此类效率比ArrayList高；底层使用双向链表存储
		|----Vector：作为List接口的古老实现类；线程安全的，效率低；底层使用Object[] elementData存储

（2）ArrayList和LinkedList
	相同点是：都线程不安全，相对线程安全的vector，执行效率较高；
	不同点是：ArrayList是实现了基于动态数组的数据结构，LinkedList基于链表的数据结构，然后就可以从数组和链表的角度去描述区别。

（3）ArrayList和Vector的区别：
	Vector和ArrayList几乎是完全相同的，唯一的区别在于Vector是同步类(synchronized)，属于强同步类，因此开销就比ArrayList要大，访问要慢。
	正常情况下,大多数的Java程序员使用ArrayList而不是Vector,因为同步完全可以由程序员自己来控制。
	Vector每次扩容请求其大小的2倍空间，而ArrayList是1.5倍。
	Vector还有一个子类Stack。

（4）List除了从Collection集合继承的方法外，List 集合里添加了一些根据索引来操作集合元素的方法。

​	void add(intindex, Object ele):在index位置插入ele元素
​	boolean addAll(int index, Collection eles):从index位置开始将eles中的所有元素添加进来
​	Object get(int index):获取指定index位置的元素
​	int indexOf(Object obj):返回obj在集合中首次出现的位置
​	int lastIndexOf(Object obj):返回obj在当前集合中末次出现的位置
​	Object remove(int index):移除指定index位置的元素，并返回此元素
​	Object set(int index, Object ele):设置指定index位置的元素为ele
​	List subList(int fromIndex, int toIndex):返回从fromIndex到toIndex位置的子集合

4、Set接口

（1） |----Set接口：存储无序的、不可重复的数据 
		|----HashSet：作为Set接口的主要实现类；线程不安全的；可以存储null值
			|----LinkedHashSet：作为HashSet的子类；遍历其内部数据时，可以按照添加的顺序遍历,对于频繁的遍历操作，LinkedHashSet效率高于HashSet.
		|----TreeSet：可以确保集合元素处于排序状态。TreeSet底层使用红黑树结构存储数据。

（2）Set接口没有提供额外的方法。

#### map

1、map接口继承树

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/a1fdb6d75598e87a224697d12c2c2bcf.png" alt="img" style="zoom:50%;" />

> Map 中的key 用Set来存放，不允许重复

#### collections工具类

Collections 是一个操作Set、List和Map 等集合的工具类（Arrays是操作数组的工具类）

Collections中提供了一系列静态的方法对集合元素进行排序、查询和修改等操作，还提供了对集合对象设置不可变、对集合对象实现同步控制等方法。
	reverse(List)：反转List 中元素的顺序
	shuffle(List)：对List集合元素进行随机排序
	sort(List)：根据元素的自然顺序对指定List 集合元素按升序排序
	sort(List，Comparator)：根据指定的Comparator 产生的顺序对List 集合元素进行排序
	swap(List，int，int)：将指定list 集合中的i处元素和j 处元素进行交换



### ArrayList

（1） 继承了 AbstractList ，并同时实现了 List 接口（List接口继承了Collection接口）。
	ArrayList 类位于 java.util 包中，使用前需要引入它：import java.util.ArrayList;
	另外，注意，ArrayList和后面介绍的这几个数据结构都是利用基本类型的包装类，而不是基本数据类型。

（2）扩容机制：
	ArrayList在创建时，底层数组初始化为{}；
	调用add后，低层才创建一个长度为10的数组；
	长度不够时会进行扩容，默认情况下，扩容为原来的容量的1.5倍，同时需要将原有数组中的数据复制到新的数组中。

（3）常用方法：
	用多个元素初始化：ArrayList<Type> obj = new ArrayList<Type>(Arrays.asList(Object o1, Object o2, Object o3, ....so on));
	add()：添加元素，如sites.add("Google"); 另有arraylist.addAll(int index, Collection c)；//add和addAll的index都可省略，此时添加到末尾
	addAll()：添加多个元素，比如list.addAll(Arrays.asList(a, b, c, d, e));
	get()：访问元素，如System.out.println(sites.get(1)); // 访问第二个元素
	set()：修改元素，如sites.set(2, "Wiki"); // 第一个参数为索引位置，第二个为要修改的值
	remove()：删除元素，并返回此元素，如sites.remove(3); // 删除第四个元素，当然也有removeAll()，但不推荐使用它，推荐使用clear()；
	size()：计算大小，如System.out.println(sites.size());
	clear()：用于删除动态数组中的所有元素，clear() 是动态数组中删除所有元素的最好方法，clear() 比 removeAll() 更快，更高效；
	clone()：拷贝一份动态数组，属于浅拷贝（只复制对象的指针），返回 ArrayList 对象，如
		ArrayList<String> cloneSites = (ArrayList<String>)sites.clone(); 注意这里要强制转换。
	contains()：判断元素是否在动态数组中，如System.out.println(sites.contains("Weibo"));
	indexOf()：返回动态数组中元素的索引值，如**int** position1 = sites.indexOf("Runoob");
	isEmpty()：判断动态数组是否为空；
	subList()：截取并返回动态数组中的一部分，如System.out.println("SubList: " + sites.subList(1, 3));（左闭右开）；
	sort()：根据指定的顺序对动态数组中的元素进行排序，如sites.sort(Comparator.reverseOrder());将进行降序排序，Comparator.naturalOrder()则为升序排序；
	toArray()：将 Arraylist 对象转换为数组，如String[] arr = **new** String[sites.size()];  sites.toArray(arr);
				注意，整型的要用Integer[]才行，int[]不行，但是可以这样：int[] arr = list.stream().mapToInt(Integer::valueOf).toArray();
	toString()：将 Arraylist 对象转换为字符串，如String list = sites.toString();

（4）在**import** java.util.Collections;后，可以实现对ArrayList的排序，如 ⭐
		ArrayList<Integer> myNumbers = **new** ArrayList<Integer>();
		Collections.sort(myNumbers);
		Collections.sort(myNumbers,Collections.reverseOrder());//降序排序，不返回排序后的数组
		Collections.sort(myNumbers,Comparator.reverseOrder());//降序排序，不返回排序后的数组
		Collections.reverse(myNumbers);//反转ArrayList，不返回排序后的数组

### LinkedList

（1）是个链表

（2）常用方法：
	add()、get()、remove()：同上，但是它有几个更特殊的--addFirst()、addLast()、getFirst()、getLast()、removeFirst()、removeLast()；
	poll()：删除并返回第一个元素，remove()不加参数时也是删除并返回最后一个元素；
	其他的一些算法可以参考动态数组的。

### Stack

​	栈是Vector的一个子类，它实现了一个标准的后进先出的栈，栈本身最重要的就是 push 和 pop.
​	堆栈只定义了默认构造函数，用来创建一个空栈。堆栈除了包括由Vector定义的所有方法，也定义了自己的一些方法：
​		boolean empty() 测试堆栈是否为空。
​		Object peek( )查看堆栈顶部的对象，但不从堆栈中移除它。
​		Object pop( )移除堆栈顶部的对象，并作为此函数的值返回该对象。
​		Object push(Object element)把项压入堆栈顶部。
​		int search(Object element)返回对象在堆栈中的位置，以 1 为基数。

​	用栈Stack 创建对象：Stack<Integer> stack = new Stack<>();


### HashMap

（1）是一个散列表，它存储的内容是键值对(key-value)映射。HashMap 实现了 Map 接口，继承于AbstractMap。
	HashMap 是**无序的**，即不会记录插入的顺序。
	所有的key构成的集合是Set:无序的、不可重复的。所以，`key`所在的类要重写：`equals()`和`hashCode()`
	所有的value构成的集合是Collection:无序的、可以重复的。所以，`value`所在的类要重写：`equals()`
	HashMap 类位于 java.util 包中，使用前需要引入它，语法格式如下：import java.util.HashMap; 

（2）常用方法：
	put()：添加键值对，如HashMap<**Integer**, String> Sites = **new** HashMap<Integer, String>();   Sites.put(1, "Google");
	get(key)：获取 key 对应的 value；
	remove(key)：删除 key 对应的键值对；
	containsKey()：检查 hashMap 中是否存在指定的 key 对应的映射关系，当然也有containsValue()；
	clear()、size（）等方法和动态数组的都类似；

（3）keySet() 和values() 
	如果你只想获取 key，可以使用 keySet() 方法，然后可以通过 get(key) 获取对应的 value，如果你只想获取 value，可以使用 values() 方法。

```java
import java.util.HashMap;
public class RunoobTest {
    public static void main(String[] args) {
        HashMap<Integer, String> Sites = new HashMap<Integer, String>();// 创建 HashMap 对象 Sites
        Sites.put(1, "Google");// 添加键值对
        Sites.put(2, "Runoob");
        Sites.put(3, "Taobao");
        Sites.put(4, "Zhihu");
        for (Integer i : Sites.keySet()) {// 输出 key 和 value
            System.out.println("key: " + i + " value: " + Sites.get(i));
        }
        for(String value: Sites.values()) {// 返回所有 value 值
          System.out.print(value + ", ");// 输出每一个value
        }
    }
}
```

（4）HashMap的实现原理和面试问题

参考https://blog.csdn.net/suifeng629/article/details/82179996

​	JDK 7及以前版本：HashMap是数组+链表结构(即为链地址法)(数组是HashMap的主体，链表则是主要为了解决哈希冲突而存在的)
​	JDK 8版本发布以后：HashMap是数组+链表+红黑树实现。

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/b2aebd46ed8d41111825cd15ac2a3be6.png" alt="img" style="zoom:50%;" />

​	HashMap基于hashing原理，我们通过put()和get()方法储存和获取对象。当我们将键值对传递给put()方法时，它调用键对象的hashCode()方法来计算hashcode，然后找到bucket位置来储存值对象。当获取对象时，通过键对象的equals()方法找到正确的键值对，然后返回值对象。HashMap使用链表来解决碰撞问题，当发生碰撞了，对象将会储存在链表的下一个节点中。 HashMap在每个链表节点中储存键值对对象。

>​	HashMap的内部存储结构其实是数组和链表的结合。当实例化一个HashMap时，系统会创建一个长度为Capacity的Entry数组，这个长度在哈希表中被称为容量(Capacity)，在这个数组中可以存放元素的位置我们称之为“桶”(bucket)，每个bucket都有自己的索引，系统可以根据索引快速的查找bucket中的元素。
>​	每个bucket中存储一个元素，即一个Entry对象，但每一个Entry对象可以带一个引用变量，用于指向下一个元素，因此，在一个桶中，就有可能生成一个Entry链。而且新添加的元素作为链表的head。

（5）扩容

​	HashMap中的元素越来越多的时候，hash冲突的几率也就越来越高，因为数组的长度是固定的。所以为了提高查询的效率，就要对HashMap的数组进行扩容，而在HashMap数组扩容之后，最消耗性能的点就出现了：原数组中的数据必须重新计算其在新数组中的位置，并放进去，这就是resize。

​	扩容时机：当HashMap中的元素个数超过数组大小(数组总大小length,不是数组中个数size)*loadFactor时，就会进行数组扩容（两倍），loadFactor的默认值为0.75，这是一个折中的取值。

### HashSet

（1）基于 HashMap 来实现的，是一个不允许有重复元素的集合。HashSet 允许有 null 值。HashSet 是**无序的**，即不会记录插入的顺序。HashSet 不是线程安全的， 如果多个线程尝试同时修改 HashSet，则最终结果是不确定的。 您必须在多线程访问时显式同步对 HashSet 的并发访问。HashSet 实现了 Set 接口。

（2）扩容规则：初始容量为16，当如果使用率超过0.75，就会扩大容量为原来的2倍。

（3）常用方法：
	add()、contains()、clear()、size()等方法和之前的都一样；
	remove()：它的参数是元素，而不是元素的索引，如sites.remove("Taobao"); // 删除元素，删除成功返回 true，否则为 false；
	contains(Object o)和containsAll(Collection c)：判断元素是否存在；
	isEmpty()：判断集合是否为空；
	toArray()：将内容转到数组中；

### [ConcurrentHashMap](https://blog.csdn.net/imzoer/article/details/8621074)

ConcurrentHashMap融合了hashtable和hashmap二者的优势：

- hashtable是做了同步的，hashmap未考虑同步。所以hashmap在单线程情况下效率较高。
- hashtable在多线程情况下，同步操作能保证程序执行的正确性，但是hashtable每次同步时都要锁住整个结构，不过ConcurrentHashMap解决了这个问题。

>Hashtable是用synchronized关键字来保证线程安全的，由于synchronized的机制是在同一时刻只能有一个线程操作，其他的线程阻塞或者轮询等待，在线程竞争激烈的情况下，这种方式的效率会非常的低下。

1、实现原理

​	ConcurrentHashMap使用的<font color=red>分段锁</font>技术。将ConcurrentHashMap容器的数据分段存储，每一段数据分配一个Segment（锁），当线程占用其中一个Segment时，其他线程可正常访问其他段数据。
​	CurrentHashMap包含一个Segment数组，每个Segment包含一个HashEntry数组并且守护它，当修改HashEntry数组数据时，需要先获取它对应的Segment锁；而HashEntry数组采用开链法处理冲突，所以它的每个HashEntry元素又是链表结构的元素。

![1362020763_9158](https://gitee.com/senbird/typora_pic/raw/master/pic/1362020763_9158.jpg)



## 面向对象

### 重写

​	（1）子类重写的方法的方法名和形参列表必须和父类被重写的方法的方法名、形参列表相同; 

​	（2）子类重写的方法使用的访问权限不能小于父类被重写的方法的访问权限,

​		特殊情况: 子类不能重写父类中声明为private权限的方法;

​	（3）返回值类型:

​		父类被重写的方法的返回值类型是void,则子类重写的方法的返回值类型只能是void;

​		父类被重写的方法的返回值类型是A类型，则子类重写的方法的返回值类型可以是A类或A类的子类;

​		父类被重写的方法的返回值类型如果是基本数据类型(比如:double)，则子类重写的方法的返回值类型必须是相同的基本数据类型(必须是:double)。

​	（4）子类方法抛出的异常不能大于父类被重写的方法抛出的异常;

​	（5）子类与父类中同名同参数的方法必须同时声明为非static的(即为重写)，或者同时声明为static的（不是重写，因为static方法是属于类的，子类无法覆盖父类的方法）。

### 构造器

​	（1）和C++一样，如果没有显示的定义类的构造器的话，则系统默认提供一个空参的构造器。一旦显示的定义了类的构造器之后，系统不再提供默认的空参构造器。

​	（2）我们可以在子类的方法或构造器中，通过"super.属性"或"super.方法"的方式，显式的调用父类中声明的属性或方法。
​		"super(形参列表)"的使用，必须声明在子类构造器的首行。
​		在类的构造器中，针对于"this(形参列表)"或"super(形参列表)"只能二选一，不能同时出现。​		

​	（3）在构造器的首行，既没有显式的声明"this(形参列表)"或"super(形参列表)",则默认的调用的是父类中的空参构造器。

### [static](https://www.cnblogs.com/gxyandwmm/p/9478569.html)

​	static关键字的基本作用，简而言之，一句话来描述就是：方便在没有创建对象的情况下来进行调用（方法/变量）。

​	很显然，被static关键字修饰的方法或者变量不需要依赖于对象来进行访问，只要类被加载了，就可以通过类名去进行访问。

1、static方法

- 静态方法中，只能调用静态的方法或属性（因为非静态成员方法/变量都是必须依赖具体的对象才能够被调用）；非静态的方法中，可以调用所有的方法或属性。
- 在静态的方法内，不能使用 this 关键字、super 关键字。
- 静态方法随着类的加载而加载，可以通过"类.静态方法"的方式调用。
- main方法必须是static的，因为程序在执行main方法的时候没有创建任何对象，因此只有通过类名来访问

2、static变量

- static成员变量的初始化顺序按照定义的顺序进行初始化（当且仅当在类初次加载时会被初始化）

3、static代码块

- static关键字还有一个比较关键的作用就是 用来形成静态代码块以优化程序性能。static块可以置于类中的任何地方，类中可以有多个static块。在类初次被加载的时候，会按照static块的顺序来执行每个static块，并且只会执行一次。

  > ​	为什么说static块可以用来优化程序性能，是因为它的特性：只会在类加载的时候执行一次。因此，很多时候会将一些只需要进行一次的初始化操作都放在static代码块中进行。
  >
  > ​	初始化的顺序 静态代码块 > 构造代码块（只有大括号括起来的代码块） > 构造函数。

4、静态内部类：参考下面的内部类一节

5、静态导包

​	静态导包就是java包的静态导入，用import static代替import静态导入包是JDK1.5中的新特性。
​	一般我们导入一个类都用 import com…..ClassName;而静态导入是这样：import static com…..ClassName.* ;这里的多了个static，还有就是类名ClassName后面多了个.* ，意思是导入这个类里的静态方法（当然，也可以只导入某个静态方法，只要把 .* 换成静态方法名就行了）。然后在这个类中，就可以直接用方法名调用静态方法，而不必用ClassName.方法名 的方式来调用。
​	你可以在static对象引用、常量（记住，它们是static 或final）和static方法上进行静态导入。

好处：这种方法的好处就是可以简化一些操作，例如打印操作System.out.println(…);就可以将其写入一个静态方法print(…)，在使用时直接print(…)就可以了。

缺陷：这种方法建议在有很多重复调用的时候使用，如果仅有一到两次调用，不如直接写来的方便。

> 注意静态导包只能导静态的（或final常量），非静态方法是不能导的。

```java
//在静态导入之前：
public class TestStatic {
	public static void main(String[] args) {
		System.out.println(Integer.MAX_VALUE);
		System.out.println(Integer.toHexString(42));
	}
}
//在静态导入之后：
import static java.lang.System.out;
import static java.lang.Integer.*;
public class TestStaticImport {
	public static void main(String[] args) {
		out.println(MAX_VALUE);//可以直接用方法名调用静态方法，而不必用ClassName.方法名 的方式来调用，成员变量也是
		out.println(toHexString(42));
	}
}
```





### main() 方法

main() 方法是静态的，不能直接访问该类中的非静态成员，必须创建该类的一个实例对象后，才能通过这个对象去访问类中的非静态成员。

```java
public class main {
	public static void main(String[] args) { //Java 虚拟机需要调用类的 main()方法，所以该方法的访问权限必须是 public，又因为 Java 虚拟机在执行 main()方法时不必创建对象，所以该方法必须是 static 的，该方法接收一个 String 类型的数组参数，该数组中保存执行 Java 命令时传递给所运行的类的参数。
		Main.main(new String[100]); 	 	//能直接访问别的类中的静态成员
		MainTest test = new MainTest(); 	//不能直接访问该类中的非静态成员
		test.show();
    }
    public void show(){
	}
}

class Main1{//不能有类的名字和public类的类名一样（仅大小写不同是不行的，比如main和Main被视为冲突）
	public static void main(String[] args) { //别的类中也可以有main方法，不过它不像public类中的main方法一样有特殊含义
		for(int i = 0;i < args.length;i++){
			args[i] = "args_" + i;
			System.out.println(args[i]);
		}
	}
}
```

### 接口

（1）接口就是规范，定义的是一组规则，体现了现实世界中“如果你是/要…则必须能…”的思想。继承是一个"是不是"的关系，而接口实现则是"能不能"的关系。接口的本质是契约，标准，规范，就像我们的法律一样。制定好后大家都要遵守。

（2）细节
	接口中的所有成员变量会被隐式地指定为 public static final 。（所以可以通过“接口名.属性名”的方式直接调用其中的属性）
	接口中的所有抽象方法会被隐式地指定为 public abstract 。 
	接口中没有构造器，意味着接口和抽象类一样不可以实例化。（抽象类可以有构造器，因为它是类）
	如果实现（implements）类没有覆盖接口中所有的抽象方法，则此实现类仍为一个抽象类。
	接口之间用继承（如 interface Rollable extends Playable, Bounceable {...}，其中Playable, Bounceable都是接口）

（3）接口也可以表现出多态性（在多态性方面，被implements的接口相当于继承关系中的父类，比如USB usb = new Flash()，USB是个接口，Flash是实现它的类）

（4）在设计模式上，抽象类用于实现模板方法模式，接口用于实现代理模式、简单工厂模式、工厂方法模式。

（5）JDK8后，可以在接口中添加静态方法和默认（default）方法。从技术角度来说，这是完全合法的，只是它看起来违反了接口作为一个抽象定义的理念。
	接口中定义的静态方法，只能通过接口来调用；
	通过实现该接口的类的对象，可以调用接口中的默认方法，如果实现类重写了接口中的默认方法，调用时，调用的是重写以后的方法。

> default方法是为了解决这样一个问题：接口有非常多的实现类，当需要为一个接口添加方法时，所有的实现类都必须随之修改。

```java
//接口示例
public interface TestInterface {
    public  void beforeHandle();
    public  void dealHandle();
    default void foo() {
        System.out.println("default methord");
    }
}
```



### 抽象类

​	抽象方法必须使用abstract关键字进行修饰。
​	如果一个类含有抽象方法，则称这个类为抽象类，抽象类必须在类前用abstract关键字修饰。
​	因为抽象类中无具体实现的方法，所以不能用抽象类创建对象。

>如果一个类不包含抽象方法，只是用abstract修饰的话也是抽象类。也就是说抽象类不一定必须含有抽象方法。
>
>包含抽象方法的类称为抽象类，但并不意味着抽象类中只能有抽象方法，它和普通类一样，同样可以拥有成员变量和普通的成员方法。

```java
//抽象类示例
public abstract class TestAbstractDoor {
    public abstract void open();
    public abstract void close();
}
```

1、抽象类和普通类的主要有三点区别：

　　1）抽象方法必须为public或者protected（因为如果为private，则不能被子类继承，子类便无法实现该方法），缺省情况下默认为public。

　　2）抽象类不能用来创建对象；

　　3）如果一个类继承于一个抽象类，则子类必须实现父类的抽象方法。如果子类没有实现父类的抽象方法，则必须将子类也定义为为abstract类。

2、抽象类和接口

|        | 抽象程度 | 成员变量类型                                      | 方法                 | 继承                     | 设计意图           |
| ------ | -------- | ------------------------------------------------- | -------------------- | ------------------------ | ------------------ |
| 抽象类 |          | 各种类型（可以有实例变量）                        | 提供默认方法         | 一个类只能继承一个抽象类 | 作为模板来继承使用 |
| 接口   | 更高     | public static final（只能有类变量，没有实例变量） | JDK8之后提供默认方法 | 一个类却可以实现多个接口 | 作为行为规范来实现 |





### 内部类

1、实例化内部类对象的方式：（假设外部类是Person）
	声明为static的内部类Dog：	

```java
Person.Dog dog = new Person.Dog();
```

​	声明为非static的内部类Bird：

```java
Person p = new Person(); 	
Person.Bird bird = p.new Bird();
//或者一句话搞定也行：
Person.Bird bird = new Person().new Bird();
```

2、为何要用内部类？

- 内部类一般只为其外部类使用；
- 也是最吸引人的原因，每个内部类都能独立地继承一个接口，而无论外部类是否已经继承了某个接口。因此，内部类使多重继承的解决方案变得更加完整。

>​	内部类是一个编译时概念，编译后外部类及其内部类会生成两个独立的class文件： `OuterClass.class`和`OuterClass$InnerClass.class`。这也就决定了内部类和外部类之间访问方式的差异。

3、非静态内部类中，外部类和内部类的访问：

- 外部类不可以直接访问内部类的元素，而需要按常规的类访问方式（外部类访问内部类，需要创建对象访问）使用内部类，外部类可以访问内部类的所有方法与属性，包括私有方法与属性。
- 内部类可以直接访问外部类的元素（包括私有的），这是因为在创建外部类时，内部类会自动捕获一个外部类的引用，所以内部类访问外部类元素，实际上是通过他所持有外部类引用访问的。

4、静态内部类中，外部类和内部类的访问：

​	静态内部类与非静态内部类之间存在一个最大的区别，我们知道非静态内部类在编译完成之后会隐含地保存着一个引用，该引用是指向创建它的外部类，但是静态内部类却没有。没有这个引用就意味着：
​	静态内部类的创建是不需要依赖于外围类，可以直接创建；
​	静态内部类不可以使用任何外围类的非static成员变量和方法，而内部类则都可以。



### [深拷贝VS浅拷贝](https://www.cnblogs.com/ysocean/p/8482979.html)

浅拷贝：创建一个新对象，然后将当前对象的非静态字段复制到该新对象，如果字段是值类型的，那么对该字段执行复制；如果该字段是引用类型的话，则复制引用但不复制引用的对象。因此，原始对象及其副本引用同一个对象。

> 调用对象的 clone 方法，必须要让类实现 Cloneable 接口，并且覆写 clone 方法：
>
> ```java
> public class Person implements Cloneable{
>     ...
>     @Override
>     protected Object clone() throws CloneNotSupportedException {
>         return super.clone();
>     }
>     ...
> }
> //使用时：Person p2 = (Person) p1.clone();
> ```

深拷贝：创建一个新对象，然后将当前对象的非静态字段复制到该新对象，无论该字段是值类型的还是引用类型，都复制独立的一份。当你修改其中一个对象的任何内容时，都不会影响另一个对象的内容。

>String类型的变量clone后的表现好象也实现了深度clone，但其实只是一个假象：
>
>​	因为执行 cloned.name = "new"; 语句时，它作用相当于生成了一个新的string类型，然后又赋回给cloned.name。
>
>​	这是因为string被sun公司的工程师写成了一个不可更改的类（immutable class），在所有string类中的函数都不能更改自身的值。

Object 类提供的 clone 是只能实现 浅拷贝的。

1、怎样实现深拷贝

（1）重写clone方法：
	让每个引用类型属性内部都重写clone() 方法（String不用）。
	有多少个引用类型，我们就要重写多少次，如果存在很多引用类型，那么代码量显然会很大，所以这种方法不太合适。

（2）利用序列化：（推荐）
	序列化是将对象写到流中便于传输，而反序列化则是把对象从流中读取出来。这里写到流中的对象则是原始对象的一个拷贝，因为原始对象还存在 JVM 中，所以我们可以利用对象的序列化产生克隆对象，然后通过反序列化获取这个对象。
	注意每个需要序列化的类都要实现 Serializable 接口，如果有某个属性不需要序列化，可以将其声明为 transient，即将其排除在克隆属性之外。

```java
//利用序列化实现 深度拷贝
public Object deepClone() throws Exception{
    // 序列化
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    ObjectOutputStream oos = new ObjectOutputStream(bos);
    oos.writeObject(this);

    // 反序列化
    ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
    ObjectInputStream ois = new ObjectInputStream(bis);
    return ois.readObject();
}
```



## Math类

```java
private void mathMethod(){
Log.d("TAG","Math.sqrt(16)----:"+Math.sqrt(16));//4.0 // Math.sqrt()计算平方根 ，输入输出均为double
Log.d("TAG","Math.cbrt(8)----:"+Math.cbrt(8));//2.0 //Math.cbrt()计算立方根
Log.d("TAG","Math.hypot(3,4)----:"+Math.hypot(3,4));//5.0 //Math.hypot(x,y)计算 (x的平方+y的平方)的平方根
Log.d("TAG","Math.pow(3,2)----:"+Math.pow(3,2));//9.0 // Math.pow(a,b)计算a的b次方，输入可以是int或double，输出必须是double
Log.d("TAG","Math.exp(3)----:"+Math.exp(3));//20.085536923187668 //Math.exp(x)计算e^x的值

Log.d("TAG","Math.max(2.3,4.5)----:"+Math.max(7,15));//15
Log.d("TAG","Math.min(2.3,4.5)----:"+Math.min(2.3,4.5));//2.3
Log.d("TAG","Math.abs(-10.4)----:"+Math.abs(-10.4));//10.4
Log.d("TAG","Math.abs(10.1)----:"+Math.abs(10.1));//10.1
    
Log.d("TAG","Math.ceil(-10.1)----:"+Math.ceil(-10.1));//-10.0 //向上取整，输入输出均为double
Log.d("TAG","Math.ceil(10.7)----:"+Math.ceil(10.7));//11.0
Log.d("TAG","Math.floor(-10.1)----:"+Math.floor(-10.1));//-11.0 //向下取整，输入输出均为double
Log.d("TAG","Math.floor(10.7)----:"+Math.floor(10.7));//10.0
    
Log.d("TAG","Math.random()----:"+Math.random());//输出[0,1)间的随机数
    
Log.d("TAG","Math.rint(10.1)----:"+Math.rint(10.1));//10.0 /Math.rint 四舍五入 返回double值
Log.d("TAG","Math.rint(10.7)----:"+Math.rint(10.7));//11.0
Log.d("TAG","Math.rint(-10.5)----:"+Math.rint(-10.5));//-10.0
Log.d("TAG","Math.rint(-10.51)----:"+Math.rint(-10.51));//-11.0
Log.d("TAG","Math.rint(-10.2)----:"+Math.rint(-10.2));//-10.0
    
Log.d("TAG","Math.round(10.1)----:"+Math.round(10.1));//10 //Math.round 四舍五入 float时返回int值，double时返回long值
Log.d("TAG","Math.round(10.7)----:"+Math.round(10.7));//11
Log.d("TAG","Math.round(-10.5)----:"+Math.round(-10.5));//-10
Log.d("TAG","Math.round(-10.51)----:"+Math.round(-10.51));//-11
Log.d("TAG","Math.round(-10.2)----:"+Math.round(-10.2));//-10

Log.d("TAG","Math.nextUp(1.2)----:"+Math.nextUp(1.2));//1.2000000000000002 //Math.nextUp(a) 返回比a大一点点的浮点数
Log.d("TAG","Math.nextDown(1.2)----:"+Math.nextDown(1.2));//1.1999999999999997 //Math.nextDown(a) 返回比a小一点点的浮点数
}
```



## 日期类

Java 8 吸收了Joda-Time 的精华，以一个新的开始为Java 创建优秀的API。新的java.time 中包含了所有关于本地日期（LocalDate）、本地时间（LocalTime）、本地日期时间（LocalDateTime）、时区（ZonedDateTime）和持续时间（Duration）的类。`LocalDate、LocalTime、LocalDateTime`类是其中较重要的几个类，它们的实例是**不可变的对象**。

>LocalDate代表IOS格式（yyyy-MM-dd）的日期,可以存储生日、纪念日等日期。
>LocalTime表示一个时间，而不是日期。
>LocalDateTime是用来表示日期和时间的，这是一个最常用的类之一。

```java
LocalDate localDate = LocalDate.now(); //2021-10-11
LocalTime localTime = LocalTime.now(); //15:38:15.077
LocalDateTime localDateTime = LocalDateTime.now(); //2021-10-11T15:38:15.077

//of():设置指定的年、月、日、时、分、秒。没有偏移量
LocalDateTime localDateTime1 = LocalDateTime.of(2020, 10, 6, 13, 23, 43); //2020-10-06T13:23:43

//getXxx()：获取相关的属性
System.out.println(localDateTime.getDayOfMonth());//11
System.out.println(localDateTime.getDayOfWeek());//MONDAY
System.out.println(localDateTime.getMonth());//OCTOBER
System.out.println(localDateTime.getMonthValue());//10
System.out.println(localDateTime.getMinute());//38
```

## 比较器⭐

​	Java中的对象，正常情况下，只能进行比较：`==`或 `!=` 。不能使用 `>`或`<`的，但是在开发场景中，我们需要对多个对象进行排序，言外之意，就需要比较对象的大小。 如何实现？使用两个接口中的任何一个：`Comparable`或 `Comparator`

> Comparable接口的方式一旦一定，保证Comparable接口实现类的对象在任何位置都可以比较大小。
>
> Comparator接口属于临时性的比较。

1、Comparable接口

​	像String、包装类等已经实现了Comparable接口，重写了compareTo(obj)方法，所以能够比较两个对象的大小。
​	而如果我们自定义的类也想能够比较大小，也应该让自定义类**实现Comparable接口，重写compareTo(obj)方法**，在compareTo(obj)方法中指明如何排序。

```java
public class CompareTest {
    public void test2(){
        Goods[] arr = new Goods[5];
        arr[0] = new Goods("lenovoMouse",34);
        arr[1] = new Goods("dellMouse",43);
        arr[2] = new Goods("xiaomiMouse",12);
        arr[3] = new Goods("huaweiMouse",65);
        arr[4] = new Goods("microsoftMouse",43);
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));//调用重写后的方法
    }
}

class Goods implements Comparable{
    private String name;
    private double price;
    public Goods() {}
    public Goods(String name, double price) {
        this.name = name;
        this.price = price;
    }
    public String getName() {    return name;}
    public void setName(String name) {    this.name = name;}
    public double getPrice() {    return price;}
    public void setPrice(double price) {    this.price = price;}
    @Override
    public String toString() {//重写toString方法
        return "Goods{" +"name='" + name + '\'' +", price=" + price +'}';
    }
    //指明商品比较大小的方式:按照价格从低到高排序,再按照产品名称从高到低排序
    @Override
    public int compareTo(Object o) {
            if(o instanceof Goods){
                Goods goods = (Goods)o;
                if(this.price > goods.price){//自己（this）和传入的对象（goods）进行比较
                    return 1;
                }else if(this.price < goods.price){
                    return -1;
                }else{
                    return -this.name.compareTo(goods.name);// 如果只比较price，不比较name的话，这里就可以return 0;
                }
            }
            throw new RuntimeException("传入的数据类型不一致！");
    }
}

```

2、Comparator

​	还是上面的goods类，但是不重写compareTo了，对于这样的Goods[] arr，可以这样排序：

```java
	Arrays.sort(arr, new Comparator() {//匿名对象
            @Override
            public int compare(Object o1, Object o2) {//重写compare方法，如果形参不是object类型的，而是具体的比如包装类类型的，那么上面的new Comparator要改成new Comparator<具体类类型> ，这里的具体类类型不能是基本数据类型，必须是包装类，以后但凡看到尖括号里面的参数，基本上都不能是基本数据类型。
                if(o1 instanceof Goods && o2 instanceof Goods){
                    Goods g1 = (Goods)o1;
                    Goods g2 = (Goods)o2;
                    if(g1.getName().equals(g2.getName())){
                        return -Double.compare(g1.getPrice(),g2.getPrice());//按照价格从高到低排序
                    }else{
                        return g1.getName().compareTo(g2.getName());//按照产品名称从低到高排序
                    }
                }
                throw new RuntimeException("输入的数据类型不一致");
            }
        });
```

## 枚举

Java 枚举类使用 enum 关键字来定义，各个常量使用逗号 **,** 来分割。例如定义一个颜色的枚举类：

```java
enum Color//enum可以定义在类里面，也可以定义在类外面，但是不能定义在函数内部
{
  RED, GREEN, BLUE;//枚举类的所有实例必须在枚举类中显式列出(, 分隔 ; 结尾)。列出的实例系统会自动添加public static final 修饰。必须在枚举类的第一行声明枚举类对象。
}
/*每个枚举都是通过 Class 在内部实现的，且所有的枚举值都是 public static final 的。以上的枚举类 Color 转化在内部类实现：
class Color
{
     public static final Color RED = new Color();
     public static final Color BLUE = new Color();
     public static final Color GREEN = new Color();
}
*/
public class Test
{
  public static void main(String[] args)
  {
    Color c1 = Color.RED;
    System.out.println(c1); //输出：RED
    for (Color myVar : Color.values()) //values()方法的使用
    	System.out.println(myVar); //逐一输出
  }
}
```

上面是一个简单的枚举类，但是枚举类不止于此：
（1）枚举类可以像普通类一样有全局变量（称为属性），但是应由private final修饰，且应在构造器中为其赋值。
（2）构造器必须使用private 权限修饰符。除了构造器，还可以有其他方法（public也可）。
（3）可以implements接口

## 异常

（开发过程中的语法错误和逻辑错误不是异常）	

（1）Java程序在执行过程中所发生的异常事件可分为两类：
	Error：Java虚拟机**无法解决**的严重问题。如：JVM系统内部错误、资源耗尽等严重情况。比如：StackOverflowError和OOM。一般不编写针对性的代码进行处理。
	Exception:其它因编程错误或偶然的外在因素导致的一般性问题，**可以使用针对性的代码进行处理**。如：空指针访问、试图读取不存在的文件、数组脚标越界

（2）java异常体系结构
	java.lang.Throwable
		|----java.lang.Error:一般不编写针对性的代码进行处理
		|----java.lang.Exception:可以进行异常处理
			|----**编译时异常**(checked，受检异常，如果程序中出现此类异常，比如说IOException，**必须对该异常进行处理**，否则编译不通过，在程序中，通常不会自定义该类异常，而是直接使用系统提供的异常类)
				|----IOEXception
					|----FileNotFoundException
				|----ClassNotFoundException
			|----**运行时异常**(unchecked，不受检异常，一般是由程序逻辑错误引起的，在程序中可以选择捕获处理，**也可以不处理**)
				|----NullPointerException
				|----ArrayIndexOutOfBoundsException
				|----ClassCaseException
				|----NumberFormatException
				|----InputMismatchException
				|----ArithmaticException

（3）在try结构中声明的变量，在出了try结构以后，就不能再被调用。

（4）try-catch-finally结构可以嵌套。

（5）使用try-catch-finally处理编译时异常，使得程序在编译时就不再报错，但是运行时仍可能报错。相当于我们使用try-catch-finally将一个编译时可能出现的异常，延迟到运行时出现。

（6）开发中，由于运行时异常比较常见，所以我们通常就不针对运行时异常编写try-catch-finally了。针对于编译时异常，我们说一定要考虑异常的处理。

（7）像数据库连接、输入输出流、网络编程Socket等资源，JVM是不能自动的回收的，我们需要自己手动的进行资源的释放。此时的资源释放，就需要声明在finally中。

（8）声明抛出异常是Java中处理异常的第二种方式：（try-catch-finally是第一种方式，总共两种方式）
	如果一个方法(中的语句执行时)可能生成某种异常，但是并不能确定如何处理这种异常，则此方法应显示地声明抛出异常，表明该方法将不对这些异常进行处理，而由该方法的**调用者负责处理**。（可以持续上抛）
	在方法声明中用throws语句可以声明**可能**抛出异常的列表，throws后面的异常类型可以是方法中产生的异常类型，也可以是它的父类。

​	<font color=red>try-catch-finally真正的将异常给处理掉了；而throws的方式只是将异常抛给了方法的调用者，并没有真正将异常处理掉。</font>  

（9）Java异常类对象除在程序执行过程中出现异常时由系统自动生成并抛出，也可根据需要使用人工创建并抛出。通过throw语句（不是throws）实现抛出操作(提交给Java运行环境)可以抛出的异常必须是Throwable或其子类的实例。

（10）两个常用的异常信息输出的方法（通常用在catch子句块中）：
	getMessage() 获取异常信息，返回字符串；
	printStackTrace() 获取异常类名和异常信息，以及异常出现在程序中的位置。返回值void。

## 注解

​	从JDK 5.0 开始, Java 增加了对元数据(MetaData，描述数据的数据) 的支持, 也就是Annotation(注解)
​	Annotation 其实就是代码里的特殊标记, 这些标记可以在编译, 类加载, 运行时被读取, 并执行相应的处理。通过使用Annotation, 程序员可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息。代码分析工具、开发工具和部署工具可以通过这些补充信息进行验证或者进行部署。
​	Annotation 可以像修饰符一样被使用, 可用于修饰包,类, 构造器, 方法, 成员变量, 参数, 局部变量的声明, 这些信息被保存在Annotation 的“name=value” 对中。

>​	在JavaSE中，注解的使用目的比较简单，例如标记过时的功能，忽略警告等。在JavaEE/Android中注解占据了更重要的角色，例如用来配置应用程序的任何切面，代替JavaEE旧版中所遗留的繁冗代码和XML配置等。
​	未来的开发模式都是基于注解的，JPA是基于注解的，Spring2.5以上都是基于注解的，Hibernate3.x以后也是基于注解的，现在的Struts2有一部分也是基于注解的了，注解是一种趋势，一定程度上可以说：框架= 注解+ 反射+ 设计模式。

> 注解与注释的区别：
>
> ​	注解 ：参与代码编译，以@开头的。它是给应用程序看的，单独使用注解毫无意义，一定要跟工具一起使用，这个所谓的工具实际就是能读懂注解的应用程序 
> ​	注释 ：对代码没有影响。对代码起到解释、说明的作用；

具体的使用参考https://www.runoob.com/w3cnote/java-annotation.html

> 比如：
>
> @Override - 检查该方法是否是重写方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。
> @Deprecated - 标记过时方法。如果使用该方法，会报编译警告。（比如我们在使用某一个方法时，提示该方法已过时，就是因为该方法使用了@Deprecated）

## 泛型

参考https://www.cnblogs.com/lwbqqyumidi/p/3837629.html

1、所谓泛型，就是允许在定义类、接口时通过一个标识表示类中某个属性的类型或者是某个方法的返回值及参数类型。这个类型参数将在使用时（例如，继承或实现这个接口，用这个类型声明变量、创建对象时）确定（即传入实际的类型参数，也称为类型实参）。

> 为什么要有泛型，直接用Object不也能实现“接收各种类型的实参”的效果吗？
>
> 原因如下：
>
> ​	第一，使用object作为形参时，任何类型都可以加入到这个集合中（比如ArrayList集合中），是类型不安全的，但是如果使用了泛型（比如ArrayList<String>），就可以在编译期间的<font color=red>类型检查</font>中发现错误。
>
> ​	第二，使用泛型时，当使用对象时无需手动对类型进行<font color=red>强制转换</font>。

```java
//泛型类示例：
public class Generic<T>{ 
    private T key;
    public Generic(T key) { //泛型构造方法形参key的类型也为T，T的类型由外部指定
        this.key = key;
    }
    public T getKey(){ //泛型方法getKey的返回值类型为T，T的类型由外部指定
        return key;
    }
}
//泛型方法示例：
public <E> void show_3(E t){//注意<E>的位置在返回值前
	System.out.println(t.toString());
}
```

2、泛型只是作用于代码编译阶段，在编译过程中，对于正确检验泛型结果后，会将泛型的相关信息擦出，也就是说，成功编译过后的class文件中是不包含任何泛型信息的。泛型信息不会进入到运行时阶段。

3、类型通配符一般是使用 ? 代替具体的类型实参。注意了，此处是类型实参，而不是类型形参！
	比如Box<?>在逻辑上是Box<Integer>、Box<Number>...等所有Box<具体类型实参>的父类。

4、泛型擦除

JVM并不知道泛型的存在，因为泛型在编译阶段就已经被处理成普通的类和方法； 
处理机制是通过类型擦除，擦除规则：

- 若泛型类型没有指定具体类型，用Object作为原始类型；
- 若有限定类型< T exnteds XClass >，使用XClass作为原始类型；
- 若有多个限定< T exnteds XClass1 & XClass2 >，使用第一个边界类型XClass1作为原始类型；

>如在代码中定义`List<Object>`和`List<String>`等类型，在编译后都会变成`List`，JVM看到的只是`List`，而由泛型附加的类型信息对JVM是看不到的。Java编译器会在编译时尽可能的发现可能出错的地方，但是仍然无法在运行时刻出现的类型转换异常的情况，类型擦除也是 Java 的泛型与 C++ 模板机制实现方式之间的重要区别。

5、[泛型擦除带来的问题](https://www.cnblogs.com/wuqinglong/p/9456193.html)

（1）类型擦除与多态的冲突和解决方法：
	子类继承泛型类时，指定泛型类类型，然后在子类中重写父类方法，但是因为父类的类型会被擦除为Object类型，所以重写会变成重载，为了解决这个问题，java引入了桥方法来使子类完成重写而非重载的目的，每一个桥方法对应一个我们重写的方法，桥方法内部会调用我们重写的方法。

（2）类型给擦除了，那为什么我们在获取的时候，不需要进行强制类型转换呢：
	看下ArrayList.get()方法：

```java
public E get(int index) {  
	RangeCheck(index);  
	return (E) elementData[index];  
}
```

​	可以看到，在return之前，会根据泛型变量进行强转。假设泛型类型变量为Date，虽然泛型信息会被擦除掉，但是会将(E) elementData[index]，编译为(Date) elementData[index]。所以我们不用自己进行强转。

## IO流

1、Scanner

```java
//测试输入一个二位矩阵存储到二维数组中，每一维的元素数量可以不一样。
public void ioTest(){
    Scanner scan=new Scanner(System.in);
    int[][] a=new int[3][5];
    for(int i=0;i<3;i++){
        String this_line=scan.nextLine();//用来每次从输入的二位矩阵中取一行，然后对这一行操作（nextLine()返回输入回车之前的所有字符，同时将光标下移一行）
        Scanner scan_line=new Scanner(this_line);//现在开始重新建立一个scanner对象来扫描这一行
        int j=0;
        while(scan_line.hasNextInt()){//读取这一行到二维数组的一行里去
            a[i][j++]=scan_line.nextInt();//nextInt()以空白符作为结尾
        }
    }
    for(int i=0;i<3;i++){
        System.out.println(Arrays.toString(a[i]));
    }
}
```







## 多线程

### java线程

​	一个Java应用程序java.exe，至少有三个线程：main()主线程，gc()垃圾回收线程，异常处理线程。当然如果发生异常，会影响主线程。

​	java创建线程的方式有四种。

### 创建新线程

（1）继承`Thread`类的方式

```java
class MyThread extends Thread{    
    @Override    
    public void run() {...}//重写run方法
}
public class ThreadDemo {    
    public static void main(String[] args) {        
        MyThread t1 = new MyThread();        
        t1.start();//通过start来启动线程，start()只能被调用一次
    }
}
```

>Thread类的常用方法：
>	start():启动当前线程，执行当前线程的run()
>	getName():获取当前线程的名字
>	setName():设置当前线程的名字
>	join():在线程a中调用线程b的join(),此时线程a就进入阻塞状态，直到线程b完全执行完以后，线程a才结束阻塞状态。
>
>​	yield():释放当前CPU的执行权
>
>​	isAlive()：返回boolean，判断线程是否还活着
>
>​	getPriority() ：返回线程优先值
>
>​	setPriority(intnewPriority) ：改变线程的优先级
>
>​	Thread.sleep(long millitime)：让当前线程“睡眠”指定时间的millitime毫秒)。在指定的millitime毫秒时间内，当前线程是阻塞状态的。
>
>​	Thread.currentThread(): 静态方法，返回当前代码执行的线程
>
>start、run、和join：
>	run()就和普通的成员方法一样，可以被重复调用。单独调用run()的话，会在当前线程中执行run()，而并不会启动新线程！
>	只运行start的时候，这个时候会把任务的执行交给任务规划器，具体线程的执行需要等待系统去安排，任务执行的时间和顺序也是不确定的，但是这些任务肯定是你定义的线程运行的，而不像只运行run时候的现象，当前主动调用的线程不会参与这些任务的执行。**start的作用是启动一个新线程，新线程会执行相应的run()方法**。start()不能被重复调用。
>	所以，使用start的时候，可以结合join来使主线程等待。join方法的实现，利用了wait（）和notifyAll（）方法。
>
>​	注意，join只是等待，并不是执行线程，执行线程只能通过run或start。
>
>
>
>|         | 谁来执行   | 是否产生新线程 | 可否被重复调用 |
>| ------- | ---------- | -------------- | -------------- |
>| start() | 新的子线程 | 是             | 不可以         |
>| run()   | 主线程     | 否             | 可以           |
>
>

（2）实现`Runnable`接口的方式（推荐）

​	开发中优先选择实现Runnable接口的方式，原因：1. 实现的方式没有类的单继承性的局限性 2. 实现的方式更适合来处理多个线程有共享数据的情况。

```java
class MThread implements Runnable{//1.创建一个实现了Runnable接口的类
    @Override
    public void run() { ... }//2.实现类去实现Runnable中的抽象方法:run()
}

public class ThreadTest1 {
    public static void main(String[] args) {
        MThread m1 = new MThread();//3.创建实现类的对象
        Thread t1 = new Thread(m1);//4.将此对象作为参数传递到Thread类的构造器中，创建Thread类的对象
        t1.start();//5.通过Thread类的对象调用start():①启动线程 ②调用当前线程的run() --> 调用了Runnable类型的target的run()
        Thread t2 = new Thread(m1);//再启动一个线程
        t2.setName("线程2");
        t2.start();
    }
}
```

> 两种方式的比较：
>
> 1、从**资源共享**的角度来看：接口的创建方式意味着多个线程实例可以共享同一个Runnable实例（即重复上面第4步，用m1创建t2、t3、、、）。
>
> 2、从**继承和实现接口**的角度来看，创建Thread类的子类是一种基于继承的技术，而实现Runnable接口是一种基于组合（Composition）的技术。由于组合相对于继承来说，其类与类之间的耦合性（Couping）更低，且继承只能单继承，因此，它也更加的灵活，即，优先使用组合。
>
> 3、从**对象的性质**来看：继承的方式下，Thread子类对象就是线程对象，而实现Runnable接口的类的对象本身并不是线程对象，只是作为一个创建线程对象的目标对象使用。
>
> 4、从对象创建成本来看：JAVA中的线程实例是一个“特殊”Runnable实例，因为在创建它的时候JAVA虚拟机会为其分配调用栈空间、内核线程等资源。因此，创建一个线程实例比起创建一个普通的Runnable实例来说，其成本要相对昂贵一点。所以，如果创建Runnable实例在将其作为方法参数传递给其他对象使用而不必用它来创建相应的线程，既可以满足我们的计算需要，也不需要创建线程实例。
>
> 5、相同点：两种方式都需要重写run(),将线程要执行的逻辑声明在run()中。另外，Thread类本身也实现了Runnable接口：public class Thread extends Object implements Runnable

（3）实现Callable接口

​	它不是实现run()方法，而是实现call()方法，call()方法是有返回值的

> import java.util.concurrent.Callable; 
>
> import java.util.concurrent.ExecutionException; 
>
> import java.util.concurrent.FutureTask;

（4）使用线程池

​	好处：1.提高响应速度（减少了创建新线程的时间） 2.降低资源消耗（重复利用线程池中线程，不需要每次都创建）

​	通过Executor 的工具类可以自动创建三种类型的普通线程池：
​		FixThreadPool(int n);  //比如ExecutorService ex=Executors.newFixedThreadPool(5);
​			固定大小的线程池。适用于为了满足资源管理需求而需要限制当前线程数量的场合。适用于负载比较重的服务器。
​		SingleThreadPoolExecutor;
​			单线程池。需要保证顺序执行各个任务的场景。
​		CashedThreadPool(); 
​			缓存线程池。当提交任务速度高于线程池中任务处理速度时，缓存线程池会不断的创建线程。适用于提交短期的异步小程序，以及负载较轻的服务器。

> import java.util.concurrent.ExecutorService; 
>
> import java.util.concurrent.Executors; //自动创建线程池
>
> import java.util.concurrent.ThreadPoolExecutor;//手动创建线程池

### 线程的状态

JDK中用Thread.State类定义了线程的几种状态：

​	新建：当一个Thread类或其子类的对象被声明并创建时，新生的线程对象处于新建状态
​	就绪：处于新建状态的线程被start()后，将进入线程队列等待CPU时间片，此时它已具备了运行的条件，只是没分配到CPU资源
​	运行：当就绪的线程被调度并获得CPU资源时,便进入运行状态，run()方法定义了线程的操作和功能
​	阻塞：在某种特殊情况下，被人为挂起或执行输入输出操作时，让出CPU并临时中止自己的执行，进入阻塞状态
​	死亡：线程完成了它的全部工作或线程被提前强制性地中止或出现异常导致结束

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/b29133ad93d3839d259de57bbfa1397a.png" alt="img" style="zoom: 67%;" />

### 线程同步

参考https://blog.csdn.net/weixin_39214481/article/details/80489586

主要学习前三种（前言：同步监视器，俗称 锁。任何一个类的对象，都可以来充当锁）。

（1）方法1：同步方法：

​	即有synchronized关键字修饰的方法。 由于java的每个对象都有一个内置锁，当用此关键字修饰方法时，内置锁会保护整个方法。在调用该方法前，需要获得内置锁，否则就处于阻塞状态。比如**public** **synchronized** **void** addMoney(**int** money){ }

> synchronized关键字也可以修饰静态方法，此时如果调用该静态方法，将会锁住整个类。
>
> 同步是一种高开销的操作，因此应该尽量减少同步的内容。通常没有必要同步整个方法，使用synchronized代码块同步关键代码即可。

（2）方法2：同步代码块：

即有synchronized关键字修饰的语句块。被该关键字修饰的语句块会自动被加上内置锁，从而实现同步。如synchronized (this) {  }  

> 详情参考https://blog.csdn.net/PorkBird/article/details/113695725 中4.1、4.2节

（3）方法3：使用重入锁实现线程同步

  在JavaSE5.0中新增了一个java.util.concurrent包来支持同步。ReentrantLock类是可重入、互斥、实现了Lock接口的锁， 它与使用synchronized方法和块具有相同的基本行为和语义，并且**扩展了其能力**。
   ReentrantLock类的常用方法有：
     ReentrantLock() : 创建一个ReentrantLock实例 
     lock() : 获得锁，是公平锁的实现(公平锁: 老的线程在排队，新来的线程也一样要排队，不能抢占)，lock如果拿不到则会一直等待
	 tryLock()：是非公平锁的实现(非公平锁: 不能保证正在排队的线程能拿到锁，因为可能被新来的线程抢走)，tryLock不管拿到拿不到都直接返回
     unlock() : 释放锁 

> **synchronized 和 ReentrantLock的选用**：
>
> ​	如果synchronized关键字能满足用户的需求，就用synchronized，因为它能简化代码 。如果需要更高级的功能，就用ReentrantLock类，此时要注意及时释放锁，否则会出现死锁，通常在finally代码释放锁。
>
> 对比的话参考https://baijiahao.baidu.com/s?id=1648624077736116382&wfr=spider&for=pc

（4）方法4：使用局部变量管理变量（生成副本）：

​	如果使用ThreadLocal管理变量，则每一个使用该变量的线程都获得该变量的副本，副本之间相互独立，这样每一个线程都可以随意修改自己的变量副本，而不会对其他线程产生影响。

> 从某种意义上来说，ThreadLocal与同步机制都是为了解决多线程中相同变量的访问冲突问题，前者采用以"空间换时间"的方法，后者采用以"时间换空间"的方式。

（5）方法5：volatile（翻译：不稳定的）获取最新变量：

​	volatile关键字为域变量的访问提供了一种免锁机制，使用volatile修饰域相当于告诉虚拟机该域可能会被其他线程更新，因此每次使用该域就要重新计算，而不是使用寄存器中的值。volatile不会提供任何原子操作，它也不能用来修饰final类型的变量。

> 注意，volatile不能保证原子操作导致，因此volatile不能代替synchronized。此外volatile会组织编译器对代码优化，因此能不使用它就不使用它吧。 它的原理是每次要线程要访问volatile修饰的变量时都是从内存中读取，而不是存缓存当中读取，因此每个线程访问到的变量值都是一样的。这样就保证了同步。

（6）方法6：使用阻塞队列实现线程同步

​	前面5种同步方式都是在底层实现的线程同步，但是我们在实际开发当中，应当尽量远离底层结构。 使用javaSE5.0版本中新增的java.util.concurrent包将有助于简化开发。下面介绍使用**LinkedBlockingQueue<E>**来实现线程的同步。
  LinkedBlockingQueue<E>是一个基于已连接节点的，范围任意的blocking queue。
  LinkedBlockingQueue 类常用方法有：
  	LinkedBlockingQueue() : 创建一个容量为Integer.MAX_VALUE的LinkedBlockingQueue 
  	put(E e) : 在队尾添加一个元素，如果队列满则阻塞 
  	size() : 返回队列中的元素个数 
  	take() : 移除并返回队头元素，如果队列空则阻塞

> 示例参见https://www.cnblogs.com/XHJT/p/3897440.html

### 线程通信

（1）wait/notify 机制

​	在这之前，线程间通过共享数据来实现通信，即多个线程主动地读取一个共享数据，通过 同步互斥访问机制保证线程的安全性。
​	等待/通知机制主要由Object类中的wait()、notify() 和 notifyAll()三个方法来实现，这三个方法均非Thread类中所声明的方法，而是Object类中声明的方法。

> 原因是每个对象都拥有monitor（锁），所以让当前线程等待某个对象的锁，当然应该通过这个对象来操作，而不是用当前线程来操作，因为当前线程可能会等待多个线程的锁，如果通过线程来操作，就非常复杂了。

​	三个方法都只能在同步代码块中调用（即前提是先获得对象的监视器锁，一般来说在 synchronized 代码块中使用），否则抛出异常 IllegalMonitorStateException。

​	Wait 会挂起自己让出 CPU 时间片，并将自身加入锁定对象的 Wait Set 中，释放对象的监视器锁（monitor）让其他线程可以获得，直到其他线程调用此对象的 notify( ) 方法或 notifyAll( ) 方法，自身才能被唤醒（这里有个特殊情况就是 Wait 可以增加等待时间）；

​	Notify 方法则会在释放锁的同时，唤醒对象 Wait Set 中等待的线程，顺序是不确定的，之后，正在wait的方法会获得锁，继续执行。<font color=red>notify后并不会阻塞</font>，而是会继续执行。

> 示例参考https://blog.csdn.net/chen_kkw/article/details/87946489

> 关于该机制的个人理解：synchronized(obj)会获取obj这个锁（对象充当锁），在退出同步代码块后会释放该锁，这个获取和解锁的过程都是隐式的，但是可以通过wait()来提前把锁释放，进入阻塞状态，这样别的线程就可以获得该锁，而原线程wait()之后的代码还可以在被notify()之后接着执行。所以该机制让synchronized变得更加灵活，但却不止于此，它能让对某一个对象的操作具有互动效果，而不是单纯地实现互斥访问，比如生产者-消费者问题。
>
> 生产者消费者问题参考https://blog.csdn.net/ldx19980108/article/details/81707751



### 可重入

参考https://www.cnblogs.com/theRhyme/p/9133804.html

​	可重入锁，指的是以线程为单位，当一个线程获取对象锁之后，这个线程可以再次获取本对象上的锁，而其他的线程是不可以的。
​	synchronized 和  ReentrantLock 都是可重入锁。
​	可重入锁的意义之一在于防止死锁。
​	实现原理是通过为每个锁关联一个请求计数器和一个占有它的线程。当计数为0时，认为锁是未被占有的；线程请求一个未被占有的锁时，JVM将记录锁的占有者，并且将请求计数器置为1 。如果同一个线程再次请求这个锁，计数器将递增；每次占用线程退出同步块，计数器值将递减。直到计数器为0,锁被释放。
​	 关于父类和子类的锁的重入:子类覆写了父类的synchonized方法，然后调用父类中的方法，此时如果没有可重入的锁，那么这段代码将产生死锁。

> 比如说A类中有两个方法：
>
> public synchronized methodA1(){
> 	methodA2();//调用下面的方法
> }
>
> public synchronized methodA2(){  //具体操作  }//也是A类的方法
>
> 当 当前线程 调用A类的对象methodA1同步方法，如果其他线程没有获取A类的对象锁，那么当前线程就获得当前A类对象的锁，然后执行methodA1同步方法，方法体中调用methodA2同步方法，当前线程能够再次获取A类对象的锁，而其他线程是不可以的，这就是可重入锁。

### [线程池](https://blog.csdn.net/lixinkuan328/article/details/94499714)

#### 参数

java.uitl.concurrent.ThreadPoolExecutor类是线程池中最核心的一个类。ThreadPoolExecutor类中有以下七个参数：

（1）corePoolSize：线程池中<font color=red>常驻</font>核心线程数
（2）maximumPoolSize：线程池能够容纳同时执行的最大线程数，此值必须大于等于1
（3）keepAliveTime：多余的空闲线程存活时间。当前线程池数量超过corePoolSize时，当空闲时间到达keepAliveTime值时，多余空闲线程会被销毁直到只剩下corePoolSize个线程为止。
（4）unit：keepAliveTime的时间单位
（5）workQueue：任务队列，被提交但尚未执行的任务
（6）threadFactory：表示生成线程池中的工作线程的线程工厂，用于创建线程，一般为默认线程工厂即可
（7）handler：拒绝策略，表示当队列满了并且工作线程大于等于线程池的最大线程数（maximumPoolSize）时如何来拒绝来请求的Runnable的策略

#### 线程池主要处理流程

- 在创建了线程池后，等待提交过来的任务请求。
- 当调用execute()方法添加一个任务请求，线程池会做如下判断：
  - 如果正在运行的线程数小于或者等于corePoolSize，那么马上会创建线程运行这个任务；
  - 如果正在运行的线程数大于corePoolSize，那么会将这个任务放入队列：
    - 如果这时候队列满了并且正在运行的线程数量还小于maximumPoolSize，那么还是要创建非核心线程运行这个任务； 
    - 如果队列满了并且线程数大于或者等于maximumPoolSize，那么会启动饱和<font color=red>拒绝策略</font>来执行。
- 当一个线程完成时，它会从队列中取下一个任务来执行。
- 当一个线程无事可做，且超过一定的时间（keepAliveTime）时，线程池会判断：
  - 如果当前运行的线程数大于corePoolSize，那么这个线程会停掉。
  - 所以线程池的所有任务完成后，它最终会收缩到corePoolSize的大小。

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20190702235001277.png)

#### 拒绝策略

 （1）AbortPolicy（默认）  直接抛出RejectedExecutionException异常阻止系统正常运行。
 （2）CallerRunsPolicy      “调用者运行”一种调节机制，该策略既不会丢弃任务，也不会抛出异常，而是将某些任务<font color=red>回退</font>给调用者，从而降低新任务的流量。
 （3）DiscardOldestPolicy    抛弃队列中等待<font color=red>最久的</font>任务，然后把当前任务加入队列中尝试再次提交当前任务。
 （4）DiscardPolicy    <font color=red>直接丢弃</font>任务，不予任何处理也不抛出异常。如果允许任务丢失，这是最好的一种方案。

>使用场景：等待队列已满，再也塞不下新任务，同时线程池中线程也已经达到maximumPoolSize数量，无法继续为新任务服务，这个时候就需要使用拒绝策略来处理。

#### 线程池使用示例

```java

public class ThreadPoolDemoFour {
    public static void main(String[] args) {
        // 自定义线程池
        ExecutorService threadPool = new ThreadPoolExecutor(3,
                5,
                60,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(1),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.CallerRunsPolicy());
        try {
            for (int i = 0; i < 10; i++) {
                threadPool.execute(() -> {
                    System.out.println(Thread.currentThread().getName() + "\t 办理业务");
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            threadPool.shutdown();
        }
    }
}
```



## [java锁](https://www.cnblogs.com/jyroy/p/11365935.html)

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20181122101753671.png)

### 乐观锁 VS 悲观锁

1、概念	

​	乐观锁与悲观锁是一种广义上的概念，体现了看待线程同步的不同角度。在Java和数据库中都有此概念对应的实际应用。

​	对于同一个数据的并发操作，悲观锁认为自己在使用数据的时候一定有别的线程来修改数据，因此在获取数据的时候会先加锁，确保数据不会被别的线程修改。
​	而乐观锁认为自己在使用数据时不会有别的线程修改数据，所以不会添加锁，只是在更新数据的时候去判断之前有没有别的线程更新了这个数据。如果这个数据没有被更新，当前线程将自己修改的数据成功写入。如果数据已经被其他线程更新，则根据不同的实现方式执行不同的操作（例如报错或者自动重试）。

> Java中，synchronized关键字和Lock的实现类都是悲观锁。
>
> 乐观锁在Java中是通过使用无锁编程来实现，最常采用的是CAS算法，Java原子类中的递增操作就通过CAS自旋实现的。

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20181122101946394.png" alt="img" style="zoom:80%;" />

2、适用

- 悲观锁适合写操作多的场景，先加锁可以保证写操作时数据正确。
- 乐观锁适合读操作多的场景，不加锁的特点能够使其读操作的性能大幅提升。

3、CAS算法

​	通过上图中的调用方式示例，我们可以发现悲观锁基本都是在显式的锁定之后再操作同步资源，而乐观锁则直接去操作同步资源。那么，为何乐观锁能够做到不锁定同步资源也可以正确的实现线程同步呢？我们通过介绍乐观锁的主要实现方式 “CAS” 的技术原理来为大家解惑。

​	CAS全称 Compare And Swap（比较与交换），是一种无锁算法。在不使用锁（没有线程被阻塞）的情况下实现多线程之间的变量同步。java.util.concurrent包中的原子类就是通过CAS来实现了乐观锁。

>​	一个线程失败或挂起并不会导致其他线程也失败或挂起，那么这种算法就被称为非阻塞算法。
>
>​	而CAS就是一种非阻塞算法实现，也是一种乐观锁技术，它能在不使用锁的情况下实现多线程安全，所以CAS也是一种无锁算法。

CAS算法涉及到三个操作数：

- 需要读写的内存值 V ，即内存位置上实际的值。
- 进行比较的值 A ，即预期内存位置上应该是什么值。
- 要写入的新值 B。

​	当且仅当 V 的值等于 A 时，CAS通过原子方式用新值B来更新V的值（“比较+更新”整体是一个原子操作），否则不会执行任何操作。一般情况下，“更新”是一个不断重试的操作。

CAS虽然很高效，但是它也存在三大问题：

- ABA问题。CAS需要在操作值的时候检查内存值是否发生变化，没有发生变化才会更新内存值。但是如果内存值原来是A，后来变成了B，然后又变成了A，那么CAS进行检查时会发现值没有发生变化，但是实际上是有变化的。ABA问题的解决思路就是在变量前面添加版本号，每次变量更新的时候都把版本号加一，这样变化过程就从“A－B－A”变成了“1A－2B－3A”。

  > JDK从1.5开始提供了AtomicStampedReference类来解决ABA问题，具体操作封装在compareAndSet()中。compareAndSet()首先检查当前引用和当前标志与预期引用和预期标志是否相等，如果都相等，则以原子方式将引用值和标志的值设置为给定的更新值。

- 循环时间长开销大。CAS操作如果长时间不成功，会导致其一直自旋，给CPU带来非常大的开销。

- 只能保证一个共享变量的原子操作。对一个共享变量执行操作时，CAS能够保证原子操作，但是对多个共享变量操作时，CAS是无法保证操作的原子性的。



### 自旋锁 VS 适应性自旋锁

1、概念

​	阻塞或唤醒一个Java线程需要操作系统切换CPU状态来完成，这种状态转换需要耗费处理器时间。如果同步代码块中的内容过于简单，状态转换消耗的时间有可能比用户代码执行的时间还要长。
​	在许多场景中，同步资源的锁定时间（从锁定到解锁的时间）很短，为了这一小段时间去切换线程，线程挂起和恢复现场的花费可能会让系统得不偿失。如果物理机器有多个处理器，能够让两个或以上的线程同时并行执行，我们就可以让后面那个请求锁的线程不阻塞，看看持有锁的线程是否很快就会释放锁。
​	而为了让当前线程（即后面那个请求锁的线程）“稍等一下”，我们需让当前线程进行自旋，如果在自旋完成后前面锁定同步资源的线程已经释放了锁，那么当前线程就可以不必阻塞而是直接获取同步资源，从而避免切换线程的开销。这就是自旋锁。

​	自旋锁的实现原理同样也是CAS。

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/2018112210212894.png" alt="img" style="zoom:80%;" />

2、适应性自旋锁

​	自旋锁本身是有缺点的，它不能代替阻塞。自旋等待虽然避免了线程切换的开销，但它要占用处理器时间。如果锁被占用的时间很短，自旋等待的效果就会非常好。反之，如果锁被占用的时间很长，那么自旋的线程只会白浪费处理器资源。所以，<font color=red>自旋等待的时间必须要有一定的限度</font>，如果自旋超过了限定次数（默认是10次，可以使用-XX:PreBlockSpin来更改）没有成功获得锁，就应当挂起线程。

​	JDK 6中引入了自适应的自旋锁（适应性自旋锁）。自适应意味着自旋的时间（次数）不再固定，而是由前一次在同一个锁上的自旋时间及锁的拥有者的状态来决定。
​	如果在同一个锁对象上，自旋等待刚刚成功获得过锁，并且持有锁的线程正在运行中，那么虚拟机就会认为这次自旋也是很有可能再次成功，进而它将允许自旋等待持续相对更长的时间。如果对于某个锁，自旋很少成功获得过，那在以后尝试获取这个锁时将可能省略掉自旋过程，直接阻塞线程，避免浪费处理器资源。



### 无锁 VS 偏向锁 VS 轻量级锁 VS 重量级锁

​	这四种锁是指锁的状态，专门针对synchronized的。
​	目前锁一共有4种状态，级别从低到高依次是：无锁、偏向锁、轻量级锁和重量级锁。锁状态只能升级不能降级。

>​	synchronized通过Monitor来实现线程同步，Monitor是依赖于底层的操作系统的Mutex Lock（互斥锁）来实现的线程同步。（Monitor可以理解为一个同步工具或一种同步机制，通常被描述为一个对象。每一个Java对象就有一把看不见的锁，称为内部锁或者Monitor锁。）
>
>​	synchronized这种依赖于操作系统Mutex Lock所实现的锁我们称之为“重量级锁”，JDK 6中为了减少获得锁和释放锁带来的性能消耗，引入了“偏向锁”和“轻量级锁”。

1、无锁（CAS）

​	无锁没有对资源进行锁定，所有的线程都能访问并修改同一个资源，但同时只有一个线程能修改成功。
​	上面我们介绍的CAS原理及应用即是无锁的实现。无锁无法全面代替有锁，但无锁在某些场合下的性能是非常高的。

2、偏向锁（自动获取锁）

​	偏向锁是指一段同步代码一直被一个线程所访问，那么该线程会自动获取锁，降低获取锁的代价。

3、轻量级锁（自旋等待）

​	是指当锁是偏向锁的时候，被另外的线程所访问，偏向锁就会升级为轻量级锁，其他线程会通过自旋的形式尝试获取锁，不会阻塞，从而提高性能。

4、重量级锁（阻塞）

​	升级为重量级锁时，此时等待锁的线程都会进入阻塞状态。

### 公平锁VS非公平锁

1、公平锁是指多个线程按照申请锁的顺序来获取锁，线程直接进入队列中排队，队列中的第一个线程才能获得锁。

- 公平锁的优点是等待锁的线程不会饿死。
- 缺点是整体吞吐效率相对非公平锁要低，等待队列中除第一个线程以外的所有线程都会阻塞，CPU唤醒阻塞线程的开销比非公平锁大。

2、非公平锁是多个线程加锁时直接尝试获取锁，获取不到才会到等待队列的队尾等待。但如果此时锁<font color=red>刚好</font>可用，那么这个线程可以无需阻塞直接获取到锁，所以非公平锁有可能出现后申请锁的线程先获取锁的场景。

- 非公平锁的优点是可以减少唤起线程的开销，整体的吞吐效率高，因为线程有几率不阻塞直接获得锁，CPU不必唤醒所有线程。
- 缺点是处于等待队列中的线程可能会饿死，或者等很久才会获得锁。

### 可重入锁 VS 非可重入锁

​	可重入锁又名递归锁，是指在同一个线程在外层方法获取锁的时候，再进入该线程的内层方法会自动获取锁（前提锁对象得是同一个对象或者class），不会因为之前已经获取过还没释放而阻塞。Java中ReentrantLock和synchronized都是可重入锁，可重入锁的一个优点是可一定程度避免死锁。

​	具体的可以参见前面“多线程”一节，里面有讲。

### 独享锁 VS 共享锁

​	java的ReentrantReadWriteLock有两把锁：ReadLock和WriteLock，由词知意，一个读锁一个写锁，合称“读写锁”。
​	读锁是共享锁，写锁是独享锁（排他锁）。

- 共享锁（读锁）：其他事务可以读，但不能写。

  > 该锁可被多个线程所持有。如果线程T对数据A加上共享锁后，则其他线程只能对A再加共享锁，不能加排它锁。获得共享锁的线程只能读数据，不能修改数据。

- 排他锁（写锁） ：其他事务不能读取，也不能写。

  > 该锁一次只能被一个线程所持有。如果线程T对数据A加上排它锁后，则其他线程不能再对A加任何类型的锁。获得排它锁的线程即能读数据又能修改数据。



## 反射

### 介绍

1、反射的概念：

​	Reflection（反射）是被视为动态语言的关键，反射机制允许程序在执行期借助于Reflection API取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。
​	加载完类之后，在堆内存的方法区中就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。这个对象就像一面镜子，透过这个镜子看到类的结构，所以，我们形象的称之为：反射。

> ​	动态语言是一类在运行时可以改变其结构的语言：例如新的函数、对象、甚至代码可以被引进，已有的函数可以被删除或是其他结构上的变化。通俗点说就是在运行时代码可以根据某些条件改变自身结构。主要动态语言：Object-C、C#、JavaScript、PHP、Python、Erlang。
>
> ​	与动态语言相对应的，运行时结构不可变的语言就是静态语言。如Java、C、C++。但我们可以利用反射机制、字节码操作获得类似动态语言的特性。

> Class类型的对象是什么：
>
> ​	一个.java的文件经过javac命令编译成功后，得到一个.class的文件；
>
> ​	当我们执行了初始化操作(有可能是new、有可能是子类初始化 父类也一同被初始化、也有可能是反射...等)，会将.class文件通过类加载器装载到jvm中；
>
> ​	将.class文件加载器加载到jvm中，又分了好几个步骤，其中包括 加载、连接和初始化；
>
> ​	其中在加载的时候，会在Java堆中创建一个java.lang.Class类的对象，这个Class对象代表着类相关的信息。
>
> 既然说，Class对象代表着类相关的信息，那说明只要类有什么东西，在Class对象我都能找得到。

2、反射有什么用

​	当我们在使用 IDE(如IDEA)时，当我们输入一个类对象并调用它的属性或方法时，一按 (“.”)点号，编译器就会自动列出她的属性或方法，这里就会用到反射。
​	反射最重要的用途就是开发各种通用框架。

3、Java反射机制提供的功能
	在运行时判断任意一个对象所属的类
	在运行时构造任意一个类的对象
	在运行时判断任意一个类所具有的成员变量和方法
	在运行时获取泛型信息
	在运行时调用任意一个对象的成员变量和方法（私有的也可以）
	在运行时处理注解
	生成动态代理

4、封装性/访问权限修饰符告诉我们私有的别的地方不能用，而反射呢告诉我们可以用私有的，这样看不就白封装了吗？

​	两者之间不矛盾，public/../private的区分，想做到的是尽量不暴露内部实现，给用户提供一个安全、便捷的方式来使用。但确实在特殊情况下，需要关注甚至修改内部实现（比如测试环境），这种例外的存在并不影响封装的理念。封装就像是“知道这么多就可以用了”，而不是“这是机密，坚决不能让别人知道”。反射就像是“你清楚内部实现，你知道你在干什么，相信你不会搞砸”。

### 使用

反射就是围绕着Class对象和java.lang.reflect类库来学习，就是各种的API。

1、反射相关的主要API
	java.lang.Class:代表一个类
	java.lang.reflect.Method:代表类的方法
	java.lang.reflect.Field:代表类的成员变量
	java.lang.reflect.Constructor:代表类的构造器

2、使用反射

```java
public void test2() throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
    	//1.获取Person类的class对象
        Class clazz = Person.class;//获取class对象的第一种方式：根据类名获取，这种更高效安全（会受到检查）
        //Class clazz = Class.forName(className);  //获取class对象的第二种方式：根据全限定名获取
        //Class clazz = student.getClass();  //获取class对象的第三种方式：根据类型对象，直接获取
    
        //2.获取构造方法
        Constructor cons = clazz.getConstructor(String.class,int.class);//Person类的构造方法：public Person(String name, int age) {...}
        //Constructor[] constructors = clazz.getConstructors();//获取所有的构造器
    
        //3.实例化对象
        Object obj = cons.newInstance("Jon",18);
        Person p = (Person) obj;
        System.out.println(p.toString());
    
        //4.调用对象的属性
        Field age = clazz.getDeclaredField("age");//获取指定的属性
        //Field[] fields = stuClass.getDeclaredFields();//获取本类的所有成员变量（包括私有的）
        //Field[] fields = stuClass.getFields();//获取本类及其父类（Object也是）的public的成员变量
        //age.setAccessible(true);//setAccessible(true)取消了Java的权限控制检查，（避开私有性检查，可以提升速度，丧失安全性）
        age.set(p,10);//修改成员变量的值，前面一个参数是引用对象，后面是值
        System.out.println(p.toString());
    
        //5.调用对象的方法
        Method show = clazz.getDeclaredMethod("show");//获取指定的方法
        //Method[] shows = stuClass.getDeclaredMethods();//获取本类的所有方法（包括私有的）
        //Method[] shows = stuClass.getMethods();//获取本类及其父类（Object也是）的public的方法
        //show.setAccessible(true);
        show.invoke(p);//通过invoke调用该方法
    }
```

> Java反射中的setAccessible()方法是否破坏了类的访问规则？
>
> ​	没有，这个问题和上面问的反射是否破坏了封装类似，setAccessible是一种hack，使用的时候必须知道自己在做什么。不用过分担心“别人用setAccessible来搞我怎么办”，死代码防不了活人，安全是一套体系，环环相扣，一环没扣上都是隐患。

### [反射为什么慢](https://blog.csdn.net/zhang6622056/article/details/98950855)

- 首先Class.forName属于native方法，native方法就要经过语言执行层面转换。也就是java到c再到java的切换。

- getMethod这个操作则会遍历该类的公有方法，如果没有命中，则还要去父类中查找。并且返回该method对象的一份copy。在查找成功之后，这份copy对象，则会占用堆空间，而无法进行内联优化，相反还会引起gc频率的提高。对性能也是一份影响。

- 在默认情况下，方法的反射调用为委派实现，委派给本地实现（native）来进行方法调用。当反射native调用超过15次就会触发jvm的动态生成字节码，之后的操作，全部都会调用该动态实现。

  > ​	动态实现与native实现相比，动态实现的效率要快的多，这是因为native的实现要在java语言层面切换到c语言，然后再次切换到java语言。但是，因为动态实现第一次生成的时候要生成字节码，而这个操作是比较耗时的。所以相比较起来单独一次调用的时候native反而要比动态实现快的多。



## swap

​	java怎么实现swap函数交换两个整数？

> java中的参数传递都是值传递，传递的都是参数的副本，怎么实现一个像C++一样的swap函数？

方法1：利用包装类以及反射

```java
    public void testSwap() throws Exception {//因为swap函数用到了反射，所以要注意抛出异常。
        Integer a=1,b=2;//a,b必须是包装类类型
        System.out.println("before swap,a= "+a+",b= "+b);
        swap(a,b);
        System.out.println("after swap,a= "+a+",b= "+b);
    }
    public void swap(Integer a ,Integer b) throws Exception {
        Field field = Integer.class.getDeclaredField("value");
        field.setAccessible(true);
        field.setInt(a, a ^ b);//这里要用setInt，不能用set
        field.setInt(b, a ^ b);//异或的特点：两个相同的数的异或得0，任何数和0异或都是他本身，且异或运算满足结合律和交换律
        field.setInt(a, a ^ b);//力扣上有一道题，“只出现一次的数字”，用的就是这种解法
    }
```

方法2：让swap返回一个交换后的数组，主调函数从数组中取值

```java
    public void testSwap() {
        String a="aaaa",b="bbbb";//注意，String虽然是引用类型，但是因为String是不可变类型，所以如果改变了它的值，就会修改它的指针指向
        System.out.println("before swap,a= "+a+",b= "+b);//输出为：before swap,a= aaaa,b= bbbb
        String[] after=swap(a,b);
        a= after[0];
        b= after[1];
        System.out.println("after swap,a= "+a+",b= "+b);//输出为：after swap,a= bbbb,b= aaaa
    }
    public String[] swap(String a ,String b) {
        return new String[]{b,a};
    }
```

方法3：利用对象来携带待交换的值，比较麻烦，这里就不介绍了。

## 其他面试问题

### a+=1、a=a+1、a++

```java
short a=1;
a= (short) (a+1);//a=a+1就会报错，因为如果等号的右边参与运算的有常量，那么java在编译时期就会进行优化，优化的结果就是直接计算完，最后再赋值
a+=1;//但是+=和++就不会报错，因为当相加的是两个字面量，或者用+=操作符时，JVM都会做自动类型转换
a++;
```







# 设计模式

参考http://c.biancheng.net/view/1338.html

## 软件设计七大原则

| 设计原则     | 一句话归纳                                                   | 目的                                       |
| ------------ | ------------------------------------------------------------ | ------------------------------------------ |
| 开闭原则     | 对扩展开放，对修改关闭                                       | 降低维护带来的新风险                       |
| 依赖倒置原则 | 高层不应该依赖低层，要面向接口编程                           | 更利于代码结构的升级扩展                   |
| 单一职责原则 | 一个类只干一件事，实现类要单一                               | 便于理解，提高代码的可读性                 |
| 接口隔离原则 | 一个接口只干一件事，接口要精简单一                           | 功能解耦，高聚合、低耦合                   |
| 迪米特法则   | 不该知道的不要知道，一个类应该保持对其它对象最少的了解，降低耦合度 | 只和朋友交流，不和陌生人说话，减少代码臃肿 |
| 里氏替换原则 | 不要破坏继承体系，子类重写方法功能发生改变，不应该影响父类方法的含义 | 防止继承泛滥                               |
| 合成复用原则 | 尽量使用组合或者聚合关系实现代码复用，少使用继承             | 降低代码耦合                               |

​	实际上，这些原则的目的只有一个：降低对象之间的耦合，增加程序的可复用性、可扩展性和可维护性。

## [单例模式](https://zhuanlan.zhihu.com/p/33102022)

​	单例（Singleton）模式的定义：指一个类只有一个实例，且该类能自行创建这个实例的一种模式。例如，Windows 中只能打开一个任务管理器，这样可以避免因打开多个任务管理器窗口而造成内存资源的浪费，或出现各个窗口显示内容的不一致等错误。

> 在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。

1、懒汉式单例

​	该模式的特点是类加载时没有生成单例，只有当第一次调用 getlnstance 方法时才去创建这个单例。代码如下：

```java
public class Singleton {
    private Singleton() {}   //构造函数私有
    private static volatile Singleton instance = null;    //注意三个限定符的顺序，尤其是volatile
    public static Singleton getInstance() {
		if (instance == null) {
			synchronized (Singleton.class){  //同步锁，注意锁是Singleton.class
				if (instance == null) {     //双重检测机制，防止重复创建对象
					instance = new Singleton();
				}
			}
		}
		return instance;
	}
}
/* volatile就能够防止这条指令发生指令重排：instance = new Singleton();这一行代码可以分解为3行伪代码
		1 memory=allocate();// 分配内存 相当于c的malloc
		2 ctorInstanc(memory) //初始化对象
		3 instance=memory //设置instance指向刚分配的地址
	上面的代码在编译器运行时，可能会出现重排序 从1-2-3 排序为1-3-2
	假如线程A在执行该代码时，B线程进来，而此时A执行了 1和3，没有执行2，此时B线程判断instance不为null 直接返回一个未初始化的对象，就会出现问题。
	而用了volatile，上面的重排序就会在多线程环境中禁止，不会出现上述问题。
*/
```

>​	如果编写的是多线程程序，则不要删除上例代码中的关键字 volatile 和 synchronized，否则将存在线程非安全的问题。
>
>​	如果不删除这两个关键字就能保证线程安全，但是每次访问时都要同步，会影响性能，且消耗更多的资源，这是懒汉式单例的缺点

```java
//练着写出来上面的代码

```

2、饿汉式单例

​	该模式的特点是类一旦加载就创建一个单例，保证在调用 getInstance 方法之前单例已经存在了。

```java
public class HungrySingleton {
    private HungrySingleton() {}
    private static final HungrySingleton instance = new HungrySingleton();
    public  static HungrySingleton getInstance() {
        return instance;
    }
}
```

>饿汉式单例在类创建的同时就已经创建好一个静态的对象供系统使用，以后不再改变，所以是线程安全的，可以直接用于多线程而不会出现问题。

## 简单工厂模式

优点：

（总结：我知道参数就能创建对象，而且不是我来创建）

1. 客户端可以免除直接创建产品对象的职责，很方便的创建出相应的产品。（工厂类包含必要的逻辑判断，可以决定在什么时候创建哪一个产品的实例）
2. 客户端无需知道所创建具体产品的类名，只需知道参数即可。
3. 也可以引入配置文件，在不修改客户端代码的情况下更换和添加新的具体产品类。（spring的思路原型）

缺点：

（总结：只有一个工厂类，使得工厂类很臃肿，而且扩展的时候还得修改这个工厂类，即，违背开闭原则）

1. 简单工厂模式的工厂类单一，负责所有产品的创建，职责过重，一旦异常，整个系统将受影响。且工厂类代码会非常臃肿，违背高聚合原则。
2. 使用简单工厂模式会增加系统中类的个数（引入新的工厂类），增加系统的复杂度和理解难度
3. 系统扩展困难，一旦增加新产品不得不修改工厂逻辑，在产品类型较多时，可能造成逻辑过于复杂

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/5-200ZQ64244445.png" alt="简单工厂模式的结构图" style="zoom:80%;" />

```java
class Client {
    @Test
    public static void main(String[] args) {
        Product product= Client.SimpleFactory.makeProduct(1);//注意静态内部类的静态方法的调用。（可以去看看内部类的实例化和静态内部类的实例化）
        product.show();//观察图和上一条语句，说明client需要知道的就是上一条语句左边的product和右边的工厂方法，而product下面的其他产品怎么创建不需要知道
    }
    //抽象产品
    public interface Product {
        void show();
    }
    //具体产品：ProductA
    static class ConcreteProduct1 implements Product {
        public void show() {
            System.out.println("具体产品1显示...");
        }
    }
    //具体产品：ProductB
    static class ConcreteProduct2 implements Product {
        public void show() {
            System.out.println("具体产品2显示...");
        }
    }
    final class Const {
        static final int PRODUCT_A = 0;
        static final int PRODUCT_B = 1;
        static final int PRODUCT_C = 2;
    }
    //工厂类，注意是static的
    static class SimpleFactory {
        public static Product makeProduct(int kind) {
            switch (kind) {
                case Const.PRODUCT_A:
                    return new ConcreteProduct1();
                case Const.PRODUCT_B:
                    return new ConcreteProduct2();
            }
            return null;
        }
    }
}
```

## 工厂方法模式

相比于简单工厂模式：

- 可以使系统在不修改原来代码的情况下引进新的产品，即满足开闭原则
- 典型的解耦框架。高层模块只需要知道产品的抽象类，无须关心其他实现类，满足迪米特法则、依赖倒置原则和里氏替换原则
- 但是类的个数容易过多，增加了复杂度
- 抽象产品只能生产一种产品，此弊端可使用抽象工厂模式解决

![工厂方法模式的结构图](https://gitee.com/senbird/typora_pic/raw/master/pic/3-1Q114135A2M3.gif)

> ​	观察上图，对于client来说，它需要知道的除了product接口和工厂方法外，还要知道具体的工厂，因为在创建工厂的时候需要知道具体的工厂有哪些才能创建，你不能创建抽象工厂的实例。

```java
interface Product {//抽象产品
    void show();//这里不需要public，具体的访问限定修饰符由实现类来确定
}
class ProductA implements Product {//具体产品：ProductA
    public void show() {
        System.out.println("具体产品1显示...");
    }
}
class ProductB implements Product {//具体产品：ProductB
    public void show() {
        System.out.println("具体产品2显示...");
    }
}
interface Factory {//抽象工厂
    Product createProduct();
}
class ProductAFactory implements Factory{ //ProductA的具体工厂
    public ProductA createProduct(){
        return new ProductA();
    }
}
class ProductBFactory implements Factory{ //ProductB的具体工厂
    public ProductB createProduct(){
        return new ProductB();
    }
}
class Client {
    @Test
    public static void main(String[] args) {
        Factory fac=new ProductBFactory();//注意，这里要创建具体的工厂（你不能创建接口的实例，只能创建接口的实现类的实例）
        Product product= fac.createProduct();
        product.show();
    }
}
```

## 抽象工厂模式

​	抽象工厂模式是工厂方法模式的升级版本，工厂方法模式只生产一个等级的产品，而抽象工厂模式可生产多个等级的产品。
​	它可以在类的内部对产品族中相关联的多等级产品共同管理，而不必专门引入多个新的类来进行管理。
​	当需要产品族时，抽象工厂可以保证客户端始终只使用同一个产品的产品组。

> 白话一点就是：抽象工厂能够生产多个产品，这些产品分别对应不同的产品族，产品族是指实现同一个接口的多个具体类。

![抽象工厂模式的结构图](https://gitee.com/senbird/typora_pic/raw/master/pic/3-1Q11416002NW.gif)

[示例代码](http://c.biancheng.net/view/1351.html)比较长，下面仅给出结构图来简单了解一下：

![农场类的结构图](https://gitee.com/senbird/typora_pic/raw/master/pic/3-1Q114160132648.gif)

## 模板方法模式

​	定义一个操作中的算法骨架，而将算法的一些步骤延迟到子类中，使得子类可以不改变该算法结构的情况下重定义该算法的某些特定步骤。它是一种类行为型模式。

```java
package learn1;

//抽象类的应用：模板方法的设计模式
public class template_mode {
    public static void main() {
        BankTemplateMethod btm = new DrawMoney();
        btm.process();
        BankTemplateMethod btm2 = new ManageMoney();
        btm2.process();
    }
}
abstract class BankTemplateMethod {//注意类名前面的abstract修饰符
    public void takeNumber() {//已实现的方法
        System.out.println("取号排队");
    }
    public abstract void transact(); // 钩子方法（注意没有大括号）
    private void evaluate() { //已实现的方法（抽象类中可以包含private方法）
        System.out.println("反馈评分");
    }
    public final void process() {// 模板方法，把基本操作组合到一起，子类一般不能重写，final修饰方法表示不可以被子类重写
        this.takeNumber();
        this.transact();// 像个钩子，具体执行时，挂哪个子类，就执行哪个子类的实现代码
        this.evaluate();
    }
}
class DrawMoney extends BankTemplateMethod {
    public void transact() {
        System.out.println("我要取款！！！");
    }
}
class ManageMoney extends BankTemplateMethod {
    public void transact() {
        System.out.println("我要理财！我这里有 2000 万美元!!");
    }
}
```



## 代理模式

​	代理模式是常用的java设计模式，他的特征是代理类与委托类有同样的接口。
​	代理类主要负责为委托类<font color=red>预处理消息、过滤消息、把消息转发给委托类，以及事后处理消息</font>等。（客户端与目标对象之间起到一个<font color=red>中介</font>作用和<font color=red>保护目标对象</font>的作用）
​	代理类与委托类之间通常会存在关联关系，一个代理类的对象与一个委托类的对象关联，代理类的对象本身并不真正实现服务，而是通过调用委托类的对象的相关方法，来提供特定的服务。简单的说就是，我们在访问实际对象时，是通过代理对象来访问的，代理模式就是在访问实际对象时引入一定程度的间接性，因为这种间接性，可以附加多种用途。

>​	在软件设计中，使用代理模式的例子也很多，例如，要访问的远程对象比较大（如视频或大图像等），其下载要花很多时间。还有因为安全原因需要屏蔽客户端直接访问真实对象，如某单位的内部数据库等。

![代理模式的结构图](https://gitee.com/senbird/typora_pic/raw/master/pic/3-1Q115093011523.gif)

根据代理的创建时期，代理模式分为[静态代理和动态代理](https://www.cnblogs.com/gonjan-blog/p/6685611.html)。

- 静态：由程序员创建代理类或特定工具自动生成源代码再对其编译，在程序运行前代理类的 .class 文件就已经存在了。
- 动态：在程序运行时，运用反射机制动态创建而成

1、静态代理

```java
//公共接口
public interface Person {
    void giveMoney();//上交班费
}

//委托类（被代理类、真实类、目标类）
public class Student implements Person {
    private String name;
    public Student(String name) {
        this.name = name;
    }
    @Override
    public void giveMoney() {
       System.out.println(name + "上交班费50元");
    }
}

//代理类
public class StudentsProxy implements Person{
    Student stu;//被代理的学生
    public StudentsProxy(Person stu) {
        if(stu.getClass() == Student.class) {// 只代理学生对象
            this.stu = (Student)stu;
        }
    }
    public void giveMoney() {//代理上交班费，调用被代理学生的上交班费行为
        System.out.println("张三最近学习有进步！");//预处理
        stu.giveMoney();
    }
}

//使用代理的过程
public class StaticProxyTest {
    public static void main(String[] args) {
        Person zhangsan = new Student("张三");//被代理的学生张三，他的班费上交有代理对象monitor（班长）完成
        Person monitor = new StudentsProxy(zhangsan);//生成代理对象，并将张三传给代理对象
        monitor.giveMoney();//班长代理上交班费
    }
}
```

2、[动态代理](https://www.zhihu.com/question/20794107/answer/658139129)

（1）动态代理的使用场景（必要性）

​	假设现在项目经理有一个需求：在项目现有所有类的方法前后打印日志。你如何在不修改已有代码的前提下，完成这个需求？
​	如果是静态代理。就需要为现有的每一个类都编写一个对应的代理类，并且让它实现和目标类相同的接口，在创建代理对象时，通过构造器塞入一个目标对象，然后在代理对象的方法内部调用目标对象同名方法，并在调用前后打印日志。
​	静态代理时，程序员要手动为每一个目标类编写对应的代理类。如果当前系统已经有成百上千个类，工作量太大了。
​	动态代理就解决了这个问题，<font color=red>它不需要你手动创建每一个类的代理类</font>。

（2）动态代理的原理

​	静态代理中之所以创建代理类并实现相同的接口，就是为了尽可能保证代理对象的内部结构和目标对象一致，这样我们对代理对象的操作最终都可以转移到目标对象身上，代理对象只需专注于增强代码的编写。
​	可以这样说：接口拥有代理对象和目标对象共同的类信息。所以，我们可以从接口那得到理应由代理类提供的信息，但是接口是无法创建对象的，所以不能直接实例化接口实现。
​	所以，动态代理的方式是：通过反射，直接得到目标Class对象，然后根据它创建代理实例。下面是一个动态代理对象的创建和使用的过程：

```java
//主要用到java.lang.reflect.InvocationHandler接口和 java.lang.reflect.Proxy类

//第一步：编写一个实现InvocationHandler接口的类，这个类中持有一个被代理对象的实例。InvocationHandler中有一个invoke方法，所有执行代理对象的方法都会被替换成执行invoke方法，且这个invoke方法中可以加入预处理和后处理（比如上面说的打印日志）。这里面最重要的就是这个T，它表明你可以传入任意类型的对象，我都可以对它的方法进行预处理和后处理。
public class StuInvocationHandler<T> implements InvocationHandler {
    T target;//invocationHandler持有的被代理对象
    public StuInvocationHandler(T target) {
       this.target = target;
    }
    @Override
    public Object invoke(Object proxy, //代表动态代理对象
                         Method method, //代表正在执行的方法
                         Object[] args//代表调用目标方法时传入的实参
                        ) throws Throwable {
        System.out.println("代理执行" +method.getName() + "方法");
        System.out.println("--before--");//预处理
        Object result = method.invoke(target, args);
        System.out.println("--after--");//后处理
        return result;
    }
}

public class ProxyTest {
    public static void main(String[] args) {
        //第二步：创建一个实例对象，这个对象是被代理的对象
        Person zhangsan = new Student("张三");
        
        //第三步：创建一个与代理对象相关联的InvocationHandler，这里面包含了代理类应该做的哪些预处理和后处理，但是它不能直接执行，要通过代理对象才能执行
        InvocationHandler stuHandler = new StuInvocationHandler<Person>(zhangsan);
        
        //第四步：创建一个代理对象stuProxy来代理zhangsan，代理对象的每个执行方法都会替换执行Invocation中的invoke方法
        Person stuProxy = (Person) Proxy.newProxyInstance(Person.class.getClassLoader(), new Class<?>[]{Person.class}, stuHandler)；

       //代理执行上交班费的方法
        stuProxy.giveMoney();
    }
}
```

实际上，第四步是一个简化的写法，详细的写法是要拆分成三步的：

```java
//第4.1步：使用Proxy类的getProxyClass静态方法生成一个动态代理类stuProxyClass 
Class<?> stuProxyClass = Proxy.getProxyClass(Person.class.getClassLoader(), new Class<?>[] {Person.class});

//第4.2步：获得stuProxyClass 中一个带InvocationHandler参数的构造器constructor
Constructor<?> constructor = PersonProxy.getConstructor(stuProxyClass.class);

//第4.3步：通过构造器constructor来创建一个动态实例stuProxy
Person stuProxy = (Person) cons.newInstance(stuHandler);
```

所以，动态代理对象stuProxy知道：

- 你传进来的目标类/接口的结构（class对象），也就是上面第4.1步的效果，所以它能调用你的方法，比如giveMoney()方法，和下图中的add方法。
- 你要做哪些预处理和后处理（invoke方法），也就是上面第三步的效果，它只需要把invoke方法和add()方法关联起来，就可以实现代理的效果。

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/v2-6aacbe1e9df4fe982a68fe142401952e_720w.jpg)



## 策略模式

​	该模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分割开来，并委派给不同的对象对这些算法进行管理。

>​	如果使用多重条件转移语句实现（即硬编码），不但使条件语句变得很复杂，而且增加、删除或更换算法要修改原代码，不易维护，违背开闭原则。如果采用策略模式就能很好解决该问题。

![策略模式的结构图](https://gitee.com/senbird/typora_pic/raw/master/pic/3-1Q116103K1205.gif)

```java
public class StrategyPattern {
    public static void main(String[] args) {
        Context c = new Context();
        Strategy s = new ConcreteStrategyA();
        c.setStrategy(s);
        c.strategyMethod();
    }
}
//抽象策略类
interface Strategy {
    public void strategyMethod();    //策略方法
}
//具体策略类A
class ConcreteStrategyA implements Strategy {
    public void strategyMethod() {
        System.out.println("具体策略A的策略方法被访问！");
    }
}
//具体策略类B
class ConcreteStrategyB implements Strategy {
    public void strategyMethod() {
        System.out.println("具体策略B的策略方法被访问！");
    }
}
//环境类
class Context {
    private Strategy strategy;
    public Strategy getStrategy() {
        return strategy;
    }
    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }
    public void strategyMethod() {//如果上下文处理方式变了，只要改动context的代码就行，不需要对每个单独client处理，这也是本方法乃至本类存在的主要意义
        strategy.strategyMethod();
    }
}
```



# 软件工程





## 面试问题

参考[一些有关产品设计的知识点](https://blog.csdn.net/xuyin1204/article/details/106292455/)、



# 408

## 数据结构

### 二叉树

1、概念

- 满二叉树：二叉树中所有非叶子结点的度都是2，且叶子结点都在同一层次上
- 完全二叉树：如果一个二叉树与满二叉树前m个节点的结构相同，这样的二叉树被称为完全二叉树
- 二叉排序树（二叉搜索树、二叉查找树）：中序遍历结果是有序的就行，不需要平衡
- 平衡二叉树（AVL树）：“平衡”的二叉排序树，即左右子树的高度差的绝对值不超过1



2、二叉树的层序遍历：对应[力扣题](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {//思路：用队列（LinkedList）实现
    public List<List<Integer>> levelOrder(TreeNode root) {
        if(root==null)
            return new ArrayList<List<Integer>>();
        List<List<Integer>> ans=new ArrayList<List<Integer>>();
        LinkedList<TreeNode> queue=new LinkedList<TreeNode>();
        queue.addLast(root);
        int count=1;
        while(count!=0){ //注意循环终止的条件
            List<Integer> layer=new ArrayList<Integer>();//layer每次存储遍历的一层节点，layer必须要在循环里面实例化，不能在循环外实例化
            for(int i=0;i<count;i++){ //开始遍历队列中的一层节点，同时将每个节点的孩子节点入队
                layer.add(queue.getFirst().val);
                if(queue.getFirst().left!=null)    queue.addLast(queue.getFirst().left);
                if(queue.getFirst().right!=null)   queue.addLast(queue.getFirst().right);
                queue.removeFirst();
            }
            ans.add(layer);
            count=queue.size();//注意while循环的终止条件和for循环执行的次数-count，是在这里计算出来的
        }
        return ans;
    }
}
```





### 红黑树

1、红黑树的性质

- 节点是红色或黑色；
- 根节点是黑色；
- 每个叶子节点都是黑色的空节点（NIL节点）；
- 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)；
- 从任一节点到其每个叶子的所有路径都包含相同数目的<font color=green>黑色</font>节点。

> 这些约束强制了红黑树的关键性质: 从根到叶子的最长的可能路径不多于最短的可能路径的两倍长。
>
> 结果是这个树大致上是平衡的。因为操作比如插入、删除和查找某个值的最坏情况时间都要求与树的高度成比例，这个在高度上的理论上限允许红黑树在最坏情况下都是高效的，而不同于普通的二叉查找树。

2、平衡调整

（1）因为 2-3-4树 其二叉树的实现本质上就是红黑树，所以可以从2-3-4树的分裂、合并过程推演到红黑树的着色过程。

> 下面第一张图描述了2-3-4树和红黑树的静态的对应关系，第二张图描述了两者平衡调整过程中的对应关系。

![image-20211121162739420](https://gitee.com/senbird/typora_pic/raw/master/pic/image-20211121162739420.png)

![image-20211121163209561](https://gitee.com/senbird/typora_pic/raw/master/pic/image-20211121163209561.png)

（2）不谈2-3-4树，单纯谈红黑树的调整过程：

>0、<font color=red>添加的节点必须为红色</font>
>
>1、变色的情况：当前结点的父亲是红色，且它的叔结点也是红色：
>
>　　2.1 把父节点和叔节点设置为黑色
>
>　　2.2 把祖父节点设置为红色
>
>　　2.3 然后从祖父结点继续向上判断是否破坏红黑树的性质
>
><img src="https://gitee.com/senbird/typora_pic/raw/master/pic/1666300-20190712162606426-415830517.png" alt="img" style="zoom:80%;" />
>
>2、左旋的情况：当前父节点是红色，叔节点是黑色，且当前的节点是右子树。
>
>　　3.1 以父节点作为左旋。
>
>3、右旋的情况：当前父节点是红色，叔节点是黑色，且当前的节点是左子树。
>
>　　4.1 把父节点变成黑色
>
>　　4.2 把祖父节点变为红色
>
>　　4.3 以祖父节点右旋转
>
>（下图就是一次变色+左旋+右旋的过程）
>
><img src="https://gitee.com/senbird/typora_pic/raw/master/pic/1666300-20190712163500636-2082882002.png" alt="img" style="zoom:100%;" />
>
>总结来看：调整手段有变色、左旋和右旋三种，且都是在父节点是红色的前提下才做调整：
>
>- 如果叔节点也是红色，那就进行变色调整（父、叔节点红色上涌）；
>- 如果叔节点是黑色
>  - 如果节点位于父节点的右子树，则左旋（左旋后伴随右旋）
>  - 如果节点位于父节点的左子树，则右旋（父节点红色上涌，右旋使祖父节点变为父节点的新的右子节点）

3、红黑树与平衡二叉树比较：

|            | 平衡性   | 每次插入最多需要几次旋转就能达到平衡 | 实现起来的难易程度 | 人生哪能多如意，万事但求半称心 |
| ---------- | -------- | ------------------------------------ | ------------------ | ------------------------------ |
| 红黑树     | 大致平衡 | 3                                    | 简单               |                                |
| 平衡二叉树 | 绝对平衡 | 不确定                               | 麻烦               |                                |

> 红黑树放弃了追求完全平衡，追求大致平衡，在与平衡二叉树的时间复杂度相差不大的情况下，保证每次插入最多只需要三次旋转就能达到平衡，实现起来也更为简单。而平衡二叉树追求绝对平衡，条件比较苛刻，实现起来比较麻烦，每次插入新节点之后需要旋转的次数不能预知。



### 排序算法

#### 冒泡排序

```java
    public void bubbleSort(){
        int a[]={3,2,5,8,1,10,21,3};
        for(int i=0;i<a.length;i++){
            for(int j=0;j<a.length-i-1;j++){
                if(a[j]>a[j+1]){//下面展示了不利用temp变量来进行两数交换的手段
                    a[j]=a[j]+a[j+1];
                    a[j+1]=a[j]-a[j+1];
                    a[j]=a[j]-a[j+1];
                }
            }
        }
        System.out.println(Arrays.toString(a));
    }
```



#### 快排

```java
    public void quickSort(int[] arr,int left,int right){
        if(left>=right)
            return;
        int i=left,j=right;
        int temp=arr[left];//暂存枢轴
        while(i<j){//从此处开始，下面的每一个子句都会判断i<j
            while(i<j&&arr[j]>temp)  j--;
            if(i<j)                  arr[i++]=arr[j]; //这里有两个细节，一个是if，一个是++
            while(i<j&&arr[i]<temp)  i++;
            if(i<j)                  arr[j--]=arr[i];
        }
        arr[i]=temp;
        quickSort(arr,left,i-1);
        quickSort(arr,i+1,right);
    }

    public void quickSortTest(){
        int a[]={3,2,5,8,1,10,21,3,22,7,0};
        quickSort(a,0,a.length-1);
        System.out.println(Arrays.toString(a));
    }
```



## 操作系统

### 线程和进程的区别

进程：资源分配的基本单位，切换耗费资源多，操作系统含多个进程，进程含多个线程。分配不同内存空间。

线程：调度执行的基本单位，切换快速，共享地址空间，通信方便。资源利用率好，需要考虑互斥与同步；同一类线程共享代码和数据空间，但是有独立运行栈和程序计数器。不给分配空间，除了cpu，共享资源。

### 进程通信方式IPC

- 管道
- 共享内存
- 消息队列
- 套接字

1、[管道](https://www.cnblogs.com/apperception/p/7614395.html)

- 父进程调用pipe开辟管道，得到两个文件描述符指向管道的两端。

  >调用`pipe`函数时在内核中开辟一块缓冲区（称为管道）用于通信，它有一个读端一个写端，然后通过`filedes`参数传出给用户程序两个文件描述符，`filedes[0]`指向管道的读端，`filedes[1]`指向管道的写端。所以管道在用户程序看起来就像一个打开的文件，通过`read(filedes[0]);`或者`write(filedes[1]);`向这个文件读写数据其实是在读写内核缓冲区。

- 父进程调用fork创建子进程，那么子进程也有两个文件描述符指向同一管道。

  >需要通过`fork`传递文件描述符使两个进程都能访问同一管道，它们才能通信。

- 父进程关闭管道读端，子进程关闭管道写端。父进程可以往管道里写，子进程可以从管道里读，管道是用环形队列实现的，数据从写端流入从读端流出，这样就实现了进程间通信。

  >两个进程通过一个管道只能实现单向通信

2、[共享内存和消息队列](http://c.biancheng.net/view/1208.html)

![通信模型](https://gitee.com/senbird/typora_pic/raw/master/pic/2-1Q1021345313P.gif)

​	消息传递对于交换较少数量的数据很有用，因为无需避免冲突。对于分布式系统，消息传递也比共享内存更易实现。共享内存可以快于消息传递，这是因为消息传递的实现经常采用**系统调用**，因此需要消耗更多时间以便内核介入。与此相反，共享内存系统仅在建立共享内存区域时需要系统调用；一旦建立共享内存，所有访问都可作为常规内存访问，无需借助内核。

​	对具有多个处理核系统的最新研究表明，在这类系统上，消息传递的性能要优于共享内存。共享内存会有高速缓存一致性问题，这是由共享数据在多个高速缓存之间迁移而引起的。随着系统的处理核的数量的日益增加，可能导致消息传递作为 IPC 的首选机制。

（1）共享内存

​	解决生产者-消费者问题的方法之一是采用共享内存。

（2）消息队列

​	通过消息队列，应用程序可独立地执行--它们不需要知道彼此的位置、或在继续执行前不需要等待接收程序接收此消息。
​	消息队列的核心优势是：

- 解耦：模块间不直接发送和接收消息，发送方将消息发到消息队列，接收方从消息队列中消费。
- 异步：模块A处理时如果需要其他模块协作，可以直接把消息发给其他模块，然后模块A直接返回响应，而不用等到其他模块处理完再响应，以缩短响应时间。
- 削峰：高峰期时，把模块处理能力之外的请求积压在消息队列中，高峰期过去之后，模块再把积压的请求处理掉。

> 华为的GTL2SendMsg()函数就是消息队列，可以跟面试官讲这个。





### [进程的状态](https://blog.csdn.net/cafucwxy/article/details/78453430)

![这里写图片描述](https://gitee.com/senbird/typora_pic/raw/master/pic/20160906192211991)

### [进程的调度方式](https://blog.csdn.net/vqtyh/article/details/78282555)

- 先来先服务调度算法（FCFS，first come first served）：谁第一个排队，谁就先被执行，在它执行过程中，不会中断它；
- 短作业优先调度算法（SJF，shortest job first）：对预计执行时间短的进程有限分配处理机，通常后来的短进程不会抢先正在执行的进程；对长进程非常不利，可能长时间得不到执行。
- 最高响应比优先法（HRRN，highest response radio next）：对于FCFS和SJF的平衡，FCFS方式只考虑每个作业的等待时间而未考虑执行时间的长短，而SJF只考虑了执行时间而未考虑等待时间的长短，因此两种算法在某种极端的情况下会带来某些不便。HRRN通过综合这两种情况算出响应比R，根据响应比完成调度。优点：长作业也有机会投入运行，缺点：每次调度前要计算响应比。
- 时间片轮转法（RR，Round-Robin）：采用剥夺方式，每个进程被分配一个时间段，按照在队列中的顺序交替执行；不利于处理紧急作业。
- 多级反馈队列（multilevel feedback queue）: UNIX使用这种调度算法 ；进程在进入待调度的队列等待时，首先进入优先级最高的Q1中等待；首先调度优先级高的队列中的进程。若高优先级队列中已经没有调度的进程，则调度次优先级队列的进程；同一队列中的各个进程按照时间片轮转调度；在低优先级队列中的进程在运行时，又有新到达的作业，那么在运行完这个时间片后，CPU马上分配给新到达的作业（剥夺）。

### [页式存储管理](https://www.cnblogs.com/wkfvawl/p/11700301.html)

分页存储管理分为：实分页存储管理和虚分页存储管理

1、实分页式存储管理

​	操作系统以页框为单位为各个进程分配内存空间。系统自动地将作业的地址空间分页，将系统的主存空间分块，页与块等大小，在作业运行时，一次性把作业的<font color=red>全部页面</font>装入内存，各个页所占的内存块可以不连续，也不必按先后顺序，可以放到不相邻的各个页框中。
​	这实际是个把作业从地址空间映射到存储空间的过程。

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/1358881-20191018195306625-957350329.png)

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/1358881-20191018202055799-553669323.png)

> 别忘了“快表”和“多级页表（页表的页表，来减小装入内存的页表大小）”

2、虚拟页式(virtual paging)存储管理

​	与上面的不同，虚拟页式存储管理在作业运行前，只把初始需要的<font color=red>一部分页面</font>装入内存块里，运行中访问自己地址空间中的但当前不在内存的页面时：

- 首先产生缺页中断，由缺页中断服务程序将所需的页面调入内存；
- 若此时内存中没有空闲物理块安置请求调入的新页面，则系统按预定的置换策略自动选择一个或一些在内存的页面，把它们换出到外存。

>​	虚拟页式存储管理实际是实分页技术与虚拟存储技术相结合的产物，其分页思想与实分页是一样的。
>
>​	为实现虚拟页式存储管理，需要:
>​		置换技术、请求装入技术和大硬盘支持；
>​		页表表目需要增加外存块号、状态位、访问位或访问字段、修改位、存取控制字段等。

（1）页面调度算法

- 最佳淘汰算法——OPT(Optimal)：理论上的算法，这种算法会保证最低的缺页率，但它是无法实现的。该算法每次都淘汰以后永不使用的，或者过最长的时间后才会被访问的页面。

- 先进先出淘汰算法——FIFO：简单，但是效率低，容易出现bleady现象

  > bleady现象：分配的页面数增多，缺页率反而提高的异常现象
  >
  > Belady现象的原因：FIFO算法的置换特征与进程访问内存的动态特征是非常不一致的，即被置换的页面通常并不是进程不会访问的。

- 最近最久未使用算法(LRU, Least Recently Used）：这是局部性原理的合理近似，性能接近最佳算法。（OPT是向前看的，而LRU是向后看的），实现上，可以对于每一页面增设一个访问时间计时器，或者为每页设置一个R位的寄存器：

  - 每次访问一页时，将该页所对应的寄存器最左位置1
  - 每隔时间间隔T，所有寄存器右移一位
  - 选择R值最小的页淘汰

- 时钟(Clock)淘汰算法：把进程所访问的页面链成一个环形链表，再设一个指针指向最老的页面。

  - 该算法首先检测指针所指的页面，如果它的访问位为0，则淘汰该页，新装入的页插入到此位置，然后指针前进一个位置；
  - 如果它的访问位为1，则清除为0，并将指针前进一个位置，继续检查访问位。重复此过程，直到找到访问位为0的页面为止。



### 生产者-消费者模型

​	生产者和消费者在同一时间段内共用同一个存储空间，生产者往存储空间中添加产品，消费者从存储空间中取走产品，当存储空间为空时，消费者阻塞，当存储空间满时，生产者阻塞。

- 三种角色：生产者、消费者、仓库
- 两种关系：生产者与生产者之间是互斥关系，消费者与消费者之间是互斥关系，生产者与消费者之间是同步与互斥关系。
- 一个交易场所：仓库存储的载体（也是synchronized传入的锁）

```java
package learn1;
//模拟生产者-消费者模型
import java.util.LinkedList;

class Storage {//仓库类
    private final int MAX_SIZE = 10;// 仓库容量
    private LinkedList<Object> list = new LinkedList<>();// 仓库存储的载体

    public void produce() {
        synchronized (list) {//注意，只有在仓库类中需要同步，且同步的是list，因为只有这里有wait和notify，生产者类和消费者类是没有的
            if (list.size() + 1 > MAX_SIZE) {
                System.out.println("【生产者" + Thread.currentThread().getName() + "】仓库已满");
                try {
                    list.wait();//wait()
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            else{
                list.add(new Object());
                System.out.println("【生产者" + Thread.currentThread().getName() + "】生产一个产品，现库存" + list.size());
                list.notifyAll();//notifyAll()
            }
        }
    }

    public void consume() {
        synchronized (list) {
            if (list.size() == 0) {
                System.out.println("【消费者" + Thread.currentThread().getName() + "】仓库为空");
                try {
                    list.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            else{
                list.remove();
                System.out.println("【消费者" + Thread.currentThread().getName()  + "】消费一个产品，现库存" + list.size());
                list.notifyAll();
            }
        }
    }
}

class Producer implements Runnable{//生产者
    private Storage storage;
    public Producer(){}
    public Producer(Storage storage){
        this.storage = storage;
    }
    @Override
    public void run(){
        while(true){
            try{
                Thread.sleep(1000);
                storage.produce();
            }catch (InterruptedException e){
                e.printStackTrace();
            }
        }
    }
}

class Consumer implements Runnable{//消费者
    private Storage storage;
    public Consumer(){}
    public Consumer(Storage storage){
        this.storage = storage;
    }
    @Override
    public void run(){
        while(true){
            try{
                Thread.sleep(3000);
                storage.consume();
            }catch (InterruptedException e){
                e.printStackTrace();
            }
        }
    }
}

class C_P {
    public static void main() {
        Storage storage = new Storage();//操作的都是同一个Storage对象
        Thread p1 = new Thread(new Producer(storage),"P1");
        Thread p2 = new Thread(new Producer(storage),"P2");
        Thread p3 = new Thread(new Producer(storage),"P3");

        Thread c1 = new Thread(new Consumer(storage),"C1");
        Thread c2 = new Thread(new Consumer(storage),"C2");
        Thread c3 = new Thread(new Consumer(storage),"C3");

        p1.start();
        p2.start();
        p3.start();
        c1.start();
        c2.start();
        c3.start();
    }
}
```

### [内核态VS用户态](https://zhuanlan.zhihu.com/p/69554144)

先来看一张Linux整体架构图：

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/v2-d3723a14f07a42c7e016ae9bc38eddef_720w.jpg" alt="img" style="zoom:67%;" />

​	从图上我们可以看出来通过系统调用将Linux整个体系分为用户态和内核态（或者说内核空间和用户空间）。

- 内核态：是一种特殊的软件程序，特殊在它能控制计算机的硬件资源，例如协调CPU资源，分配内存资源，并且提供稳定的环境供应用程序运行。
- 用户态：就是提供应用程序运行的空间，为了使应用程序访问到内核管理的资源例如CPU，内存，I/O。内核必须提供一组通用的访问接口，这些接口就叫系统调用。

|        | 特权指令 | 向对方态切换的途径                  | 直观判断                                                     |      |
| ------ | -------- | ----------------------------------- | ------------------------------------------------------------ | ---- |
| 内核态 | 不能执行 | 当CPU处于内核态，可以随意进入用户态 | 当进程在执行用户自己的代码时，则称其处于用户态               |      |
| 用户态 | 能执行   | 系统调用、中断、异常                | 当一个进程执行系统调用而陷入内核代码中执行时，就称进程处于内核态 |      |

1、从用户态到内核态切换可以通过三种方式：

- 系统调用：Linux内核中设置了一组用于实现各种系统功能的子程序，称为系统调用。从某种角度来看，系统调用和普通的函数调用非常相似。区别仅仅在于，系统调用由操作系统核心提供，运行于核心态;而普通的函数调用由函数库或用户自己提供，运行于用户态。
- 异常：如果当前进程运行在用户态，如果这个时候发生了异常事件，就会触发切换。例如：缺页异常。
- 外设中断：当外设完成用户的请求时，会向CPU发送中断信号。

>中断(interrupt)是异步的事件，典型的比如由I/O设备触发；
>
>异常(exception)是同步的事件，典型的比如处理器执行某条指令时发现出错了等等。

### 中断过程

- 中断请求：发生在CPU内部的中断（内部中断），不需要中断请求，CPU内部的中断控制逻辑直接接收处理。而外部中断请求由中断源提出。
- 中断判优：CPU一次只能接受一个中断源的请求，当多个中断源同时向CPU提出中断请求时，CPU必须找出中断优先级最高的中断源。
  - 软件判优：CPU检测到中断请求后，首先读取中断请求寄存器的内容，逐位检测它们的状态，检测到某一位为1，就确定对应的中断源有中断请求，转去执行它的中断服务程序。先检测哪一个，哪一个的优先级就高，后检测哪一个，哪一个优先级就低，检测的顺序就是各中断源的优先级顺序。
  - 硬件判优：利用专门的硬件电路确定中断源的优先级
- 中断响应：中断响应时，CPU向中断源发出中断响应信号，同时：
  - 保护硬件现场；
  - 关中断；
  - 保护断点；
  - 获得中断服务程序的入口地址。
- 中断处理：调用中断服务程序处理，中断服务程序的一般结构为：
  - 保存上下文：在中断服务程序的起始部分安排若干条入栈指令，将各寄存器的内容压入堆栈保存。
  - 开中断：在中断服务程序执行期间允许级别更高的中断请求中断现 行的中断服务程序，实现中断嵌套。
  - 中断处理：完成中断源的具体要求。
  - 恢复上下文：中断服务程序结束前，必须恢复主程序的中断现场。通常是将保存在堆栈中的现场信息弹出到原来的寄存器中。
  - 中断返回：返回到原程序的断点处，继续执行原程序。
- 中断返回：返回到原程序的断点处，恢复硬件现场，继续执行原程序。



### [僵尸进程](https://blog.csdn.net/wcl199274/article/details/41962451)（defunct）

1、出现的原因及概念

​	如果父进程在子进程之前终止，则所有的子进程的父进程都会改变为init进程，我们称这些进程由init进程领养。这时使用ps命令查看后可以看到子进程的父进程ppid已经变为了1。
​    而当子进程在父进程之前终止时，内核为每个终止子进程保存了一定量的信息，所以当终止进程的父进程调用wait或waitpid时，可以得到这些信息。这些信息至少包括进程ID、该进程的终止状态、以及该进程使用的CPU时间总量。其他的进程所使用的存储区，打开的文件都会被内核释放。
​    一个已经终止、但是其父进程尚未对其进行善后处理（获取终止子进程的有关信息，释放它仍占用的资源）的进程被称为僵尸进程。

>​	僵尸进程是一个早已死亡的进程,但在进程表(processs table)中仍占了一个位置(slot)。但是如果该进程的父进程已经先结束了,那么该进程就不会变成僵尸进程。因为每个进程结束的时候,系统都会扫描当前系统中所运行的所有进程,看看有没有哪个进程是刚刚结束的这个进程的子进程,如果是的话,就由**Init进程**来接管他,成为他的父进程,从而保证每个进程都会有一个父进程。
>
>​	而Init进程会自动wait其子进程,因此被Init接管的所有进程都不会变成僵尸进程。（inti进程是系统中所有其他用户进程的祖先进程，首先Linux内核启动，然后在用户空间中启动init进程，再启动其他系统进程，在系统启动完成后，init将变成为守护进程监视系统其他进程）

2、危害

​    可以设想一下，比如一个web服务器端，假如每次接收到一个连接都创建一个子进程去处理，处理完毕后结束子进程。假如在父进程中没有使用wait或waitpid函数进行善后，这些子进程将全部变为僵尸进程，Linux系统的进程数一般有一个固定限制值，僵尸进程将会逐渐耗尽系统资源。

3、linux下的fork()函数

​	fork函数创建了一个新的进程，新进程（子进程）与原有的进程（父进程）一模一样。子进程和父进程使用相同的代码段；子进程拷贝了父进程的堆栈段和数据段。子进程一旦开始运行，它复制了父进程的一切数据，然后各自运行，相互之间没有影响（fork之后，子进程对变量的操作不会影响父进程，父进程对变量的操作也不会影响子进程）。

4、如何杀死僵尸进程

​	如上可知，僵尸进程一旦出现之后，很难自己消亡，会一直存在下去，直至系统重启。虽然僵尸进程几乎不占系统资源，但是，这样下去，数量太多了之后，终究会给系统带来其他的影响。因此，如果一旦见到僵尸进程，我们就要将其杀掉。如何杀掉僵尸进程呢？

> kill命令杀不掉。

方法：

1. 重启服务器电脑，这个是最简单，最易用的方法，但是如果你服务器电脑上运行有其他的程序，那么这个方法，代价很大。所以，尽量使用下面一种方法。
2. 找到该defunct僵尸进程的父进程，将该进程的父进程杀掉，则此defunct进程将自动消失。

问题又来了，如何找到defunct僵尸进程的父进程呢？

```shell
ps -ef | grep defunct_process_pid
```







## 计算机网络

关于计算机网络的基础知识，可以参考：
	https://blog.csdn.net/m0_37568814/article/details/81018769 （以408科目内容为主，比较细）
	https://www.runoob.com/w3cnote/summary-of-network.html （比较简略）
	https://blog.csdn.net/Royalic/article/details/119985591（图比较多，也挺细的）

### [GET和POST](https://www.cnblogs.com/logsharing/p/8448446.html)

（1）GET和POST是HTTP协议中两种发送请求的方法。两者最直观的区别就是：
	GET把参数包含在URL中，POST通过request body传递参数，这就引申出来以下问题/区别：
		Ⅰ、GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
		Ⅱ、GET请求在URL中传送的参数是有长度限制的，而POST没有
		Ⅲ、GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留

>实质上，GET和POST只是发送机制不同，并不是一个取一个发！
>
>如果是`GET`请求，那么该HTTP请求只有HTTP Header，没有HTTP Body。如果是`POST`请求，那么该HTTP请求带有Body，以一个空行分隔。

（2）但是GET和POST本质上是没有区别的：
	HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。HTTP只是个行为准则，而TCP才是GET和POST怎么实现的基本。
	只不过因为浏览器和服务器都会遵从HTTP这个行为准则，才实现了GET和POST的差异化，如果你用GET服务，在request body偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会读出数据，有些服务器会直接忽略，所以，虽然GET可以带request body，但不能保证一定能被接收到。

（3）关于长度限制：
	因为GET是通过URL提交数据，那么GET可提交的数据量就跟URL的长度有直接关系了。而实际上，URL不存在参数上限的问题，HTTP协议规范没有对URL长度进行限制。这个限制是特定的浏览器及服务器对它的限制。
	理论上讲，POST是没有大小限制的，HTTP协议规范也没有进行大小限制。POST数据是没有限制的，起限制作用的是服务器的处理程序的处理能力。

### HTTP响应

- 1xx：表示一个提示性响应，例如101表示将切换协议，常见于WebSocket连接；
- 2xx：表示一个成功的响应，例如200表示成功，206表示只发送了部分内容；
- 3xx：表示一个重定向的响应，例如301表示永久重定向，303表示客户端应该按指定路径重新发送请求；
- 4xx：表示一个因为客户端问题导致的错误响应，例如400表示因为Content-Type等各种原因导致的无效请求，404表示指定的路径不存在；
- 5xx：表示一个因为服务器问题导致的错误响应，例如500表示服务器内部故障，503表示服务器暂时无法响应。

>​	对于最早期的HTTP/1.0协议，每次发送一个HTTP请求，客户端都需要先创建一个新的TCP连接，然后，收到服务器响应后，关闭这个TCP连接。由于建立TCP连接就比较耗时，因此，为了提高效率，HTTP/1.1协议允许在一个TCP连接中反复发送-响应，这样就能大大提高效率：
>
>​	因为HTTP协议是一个请求-响应协议，客户端在发送了一个HTTP请求后，必须等待服务器响应后，才能发送下一个请求，这样一来，如果某个响应太慢，它就会堵住后面的请求。所以，为了进一步提速，HTTP/2.0允许客户端在没有收到响应的时候，发送多个HTTP请求，服务器返回响应的时候，不一定按顺序返回，只要双方能识别出哪个响应对应哪个请求，就可以做到并行发送和接收。

### TCP、Socket、HTTP

​	这三者之间的区别可以参考[链接](https://blog.csdn.net/qq1140920745/article/details/112781991)来看，简单来看的话就是：

|        | OSI层次 | 是不是协议                                                   | 基于什么协议 | 作用                                   |
| ------ | ------- | ------------------------------------------------------------ | ------------ | -------------------------------------- |
| HTTP   | 应用层  | 是                                                           | TCP          | 提供了封装或者显示数据的具体形式       |
| Socket | 会话层  | 不是，socket是对TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口（API），通过Socket，我们才能使用TCP/IP协议（所以下面的TCP网络编程也用到了socket） |              | 提供了一个针对TCP或者UDP编程的接口     |
| TCP    | 传输层  | 是                                                           | IP           | TCP/IP为一种网络传输协议，用来传输数据 |

>两个计算机之间的交流无非是两个端口之间的数据通信,具体的数据会以什么样的形式展现是以不同的应用层协议来定义的，如HTTP、FTP。

### [Http和Https的请求过程](https://blog.csdn.net/GavinBC/article/details/107001255)

1、HTTP请求的过程

- 浏览器根据域名解析IP地址（DNS解析：浏览器缓存 → 系统缓存 → 路由器缓存 → 本地域名服务器找到域名对应的IP地址）

- 浏览器与WEB服务器建立一个TCP连接（3次握手）

- 浏览器给WEB服务器发送一个HTTP请求

  > 一个HTTP请求报文由`请求行`（请求方法、URL和HTTP协议版本）、`请求头部`（[Host](接受请求的服务器地址，可以是IP:端口，也可以是域名)、[Connection](指定与连接相关的属性，如Connection:Keep-Alive)）、`空行`（表示请求头部结束）和`请求数据`（一般用在POST请求上）4个部分组成

- 服务器端响应HTTP请求，浏览器得到HTML代码

  >HTTP响应报文由`状态行`（协议版本、状态码）、`响应头部`（headers）、`空行`（blank line）和`响应数据`（response body）4个部分组成。

- 浏览器拿到HTML文件后，开始解析HTML代码，遇到静态资源时，就向服务器端去请求下载。

- 浏览器利用自己内部的工作机制，把请求到的静态资源和HTML代码进行渲染，呈现给用户。完成后根据Connection来决定是否关闭TCP连接。

2、HTTPS请求的过程

- 客户端向服务器发起HTTPS的请求，连接到服务器的443端口；
- 服务器将非对称加密的公钥传递给客户端，以证书的形式回传到客户端；
- 客户端接受到该公钥进行验证，如果有问题，则HTTPS请求无法继续；如果没有问题，客户端这个时候随机生成一个密钥，称为`client key`,用于对称加密数据的。使用前面的公钥对`client key`进行非对称加密；客户端发起二次HTTP请求，将加密之后的`client key`传递给服务器；
- 服务器使用私钥进行解密，得到`client key`,使用`client key`对数据进行对称加密；
- 将对称加密的数据传递给客户端，客户端使用对称解密，得到服务器发送的数据，完成第二次HTTP请求。

### HTTPS和HTTP的区别

通过上面详细对HTTPS的分析，我们可得：

> - HTTPS是密文传输，HTTP是明文传输；
> - 默认连接的端口号是不同的，HTTPS是443端口，而HTTP是80端口；
> - HTTPS请求的过程需要CA证书要验证身份以保证客户端请求到服务器端之后，传回的响应是来自于服务器端，而HTTP则不需要CA证书；
> - HTTPS=HTTP+加密+认证+完整性保护。

### [HTTPS加密原理](https://zhuanlan.zhihu.com/p/43789231)

1、对称加密

（1）介绍：
	简单说就是有一个密钥，它可以加密一段信息，也可以对加密后的信息进行解密。

（2）存在的问题：
	如果通信双方都各自持有同一个密钥，且没有别人知道，这两方的通信安全当然是可以被保证的（除非密钥被破解）。然而最大的问题就是这个密钥怎么让传输的双方知晓，同时不被别人知道。
	当然可以在浏览器中内置网站的密钥，但是全世界那么多的网站，全都内置显然不现实。
	所以非对称加密就很有必要。

2、非对称加密

（1）介绍：
	简单说就是有两把密钥，通常一把叫做公钥、一把叫私钥，用公钥加密的内容必须用私钥才能解开，同样，私钥加密的内容只有公钥能解开。这样服务器或者浏览器就可以生成一对公钥和私钥，然后把公钥明文传给对方，对方发数据时用我给的公钥加密，我用我的私钥解开。

（2）存在的问题：
	虽然浏览器和服务器都可以生成各自的公钥私钥对，保证双向的加密传输（但也可能被劫持），但是非对称加密算法非常耗时，所以https并没有采取这种方案。（而对称加密快很多）。

3、非对称加密+对称加密

（1）介绍：浏览器用服务器的公钥 加密 浏览器生成的对称加密的密钥，服务器解开后，双方就用这个 对称加密的密钥 来通信。

>1. 某网站拥有用于非对称加密的公钥A、私钥A’。
>2. 浏览器向网站服务器请求，服务器把公钥A明文给传输浏览器。
>3. 浏览器随机生成一个用于对称加密的密钥X，用公钥A加密后传给服务器。
>4. 服务器拿到后用私钥A’解密得到密钥X。
>5. 这样双方就都拥有密钥X了，且别人无法知道它。之后双方所有数据都通过密钥X加密解密即可。

（2）存在的问题：
	看似又能双向加密，又能节约时间，但是却存在中间人攻击的风险，如下所述：中间人对服务器扮演浏览器的角色，对浏览器扮演服务器的角色。

>- 某网站有用于非对称加密的公钥A、私钥A’。
>- 浏览器向网站服务器请求，服务器把公钥A明文给传输浏览器。
>- 中间人劫持到公钥A，保存下来，把数据包中的公钥A替换成自己伪造的公钥B（它当然也拥有公钥B对应的私钥B’）。
>- 浏览器生成一个用于对称加密的密钥X，用公钥B（浏览器无法得知公钥被替换了）加密后传给服务器。
>- 中间人劫持后用私钥B’解密得到密钥X，再用公钥A加密后传给服务器。
>- 服务器拿到后用私钥A’解密得到密钥X。

​	这样在双方都不会发现异常的情况下，中间人通过一套“狸猫换太子”的操作，掉包了服务器传来的公钥，进而得到了密钥X。
​	根本原因是浏览器无法确认收到的公钥是不是网站自己的。

4、数字证书

​	上面已经接近胜利了，它也是HTTPS采用的加密原理，只不过在“服务器把公钥A明文给传输浏览器”这里换成了数字证书，以防止中间人攻击。
​	数字证书 = 明文 + 数字签名

<img src="https://pic2.zhimg.com/80/v2-7c78935389af46e197e96d9cd91c06dd_720w.jpg" alt="img" style="zoom: 25%;" />

>数字签名的制作过程：
>
>1. CA机构拥有非对称加密的私钥和公钥。
>2. CA机构对证书明文数据T进行hash。
>3. 对hash后的值用私钥加密，得到数字签名S。
>
>明文和数字签名共同组成了数字证书，这样一份数字证书就可以颁发给网站了。
>那浏览器拿到服务器传来的数字证书后，如何验证它是不是真的？（有没有被篡改、掉包）
>
>浏览器验证过程：
>
>1. 拿到证书，得到明文T，签名S。
>2. 用CA机构的公钥对S解密（由于是浏览器信任的机构，所以浏览器保有它的公钥。详情见下文），得到S’。
>3. 用证书里指明的hash算法对明文T进行hash得到T’。
>4. 显然通过以上步骤，T’应当等于S‘，除非明文或签名被篡改。所以此时比较S’是否等于T’，等于则表明证书可信。

>中间人有可能把证书掉包吗？
>
>​	假设有另一个网站B也拿到了CA机构认证的证书，它想劫持网站A的信息。于是它成为中间人拦截到了A传给浏览器的证书，然后替换成自己的证书，传给浏览器，之后浏览器就会错误地拿到B的证书里的公钥了，这确实会导致上文“中间人攻击”那里提到的漏洞？
>
>​	其实这并不会发生，因为证书里包含了网站A的信息，包括域名，浏览器把证书里的域名与自己请求的域名比对一下就知道有没有被掉包了。

### [RSA算法](https://blog.csdn.net/robotcat123/article/details/80588872)

​	RSA算法一直是最广为使用的"非对称加密算法"。（这种算法用他们三个人的名字命名，叫做RSA）
​	RSA加密利用了单向函数正向求解很简单，反向求解很复杂的特性。

>具体是利用了：
>1.对两个质数相乘容易，而将其合数分解很难的这个特点进行的加密算法。 n=p1*p2，已知p1、p2求n简单，已知n求p1、p2困难。
>2.(m^e) mod n=c，已知m、e、n求c简单，已知e、n、c求m很难。

```
公开密钥n、e的生成：随机选取两个质数p1、p2，n=p1*p2，再随机选取一个整数e，e与φ(n)互质。
加密过程：(m^e) mod n=c，其中m为原信息，c为加密信息，n、e为公开密钥。
解密过程：(c^d) mod n=m，其中d为解密密钥。
解密密钥d的求解：
	(c^d) mod n=(((m^e) mod n)^d) mod n=((m^e)^d) mod n=(m^ed) mod n=m ①
	根据费马定理(m^φ(n)) mod n≡1，又1^k≡1，所以(m^k*φ(n)) mod n≡1，两边同乘以m得m*((m^k*φ(n)) mod n)≡1*m，化简(m^(k*φ(n)+1)) mod n≡m ②
	由①、②得ed=(k*φ(n)+1)，解得d=(k*φ(n)+1)/e。
费马定理：若p是素数，a与p互素，则a^(p-1）≡1 （mod p）
```



### TCP握手为什么不能两次

​	考虑这样一个场景：浏览器发了一个连接请求A给服务器，但是在网路中迟迟未到，超时后浏览器又传了一次连接请求B，并以这次重传的连接请求B建立了后续的数据传输，如果采用两次握手，那当浏览器最初的那个被延迟的连接请求A在连接请求B释放后到达服务端了，这时候服务端以为浏览器又要连接，就会响应，但此时浏览器知道自己不想要和服务器建立连接，所以会对服务器的响应置之不理，如果采用两次握手，这时候就会导致服务器为浏览器白白分配资源的现象。



### TCP四次挥手

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/1692043-85d52900ae6fdd17.jpg" alt="img" style="zoom:67%;" />        ![TCP三次握手连接及四次挥手断开过程_TCP_03](https://gitee.com/senbird/typora_pic/raw/master/pic/d74280963e4a10cd3ae4e6663acc7261.png)

问题一：为什么建立连接协议是三次握手，而关闭连接却是四次握手呢？
	这是因为服务端的LISTEN状态下的SOCKET当收到SYN报文的连接请求后，它可以把ACK和SYN(ACK起应答作用，而SYN起同步作用)放在一个报文里来发送。
	但关闭连接时，当收到对方的FIN报文通知时，它仅仅表示对方没有数据发送给你了；但未必你所有的数据都全部发送给对方了，所以你可能未必会马上会关闭SOCKET,也即你可能还需要发送一些数据给对方之后，再发送FIN报文给对方来表示你同意现在可以关闭连接了，所以它这里的ACK报文和FIN报文多数情况下都是分开发送的。

问题二：close_wait到last_ack之间，服务端处理过程
	答案和上一问类似，服务器端在回复完客户端的 TCP 断开请求后，不会马上进行 TCP 连接的断开。服务器端会先确认断开前，所有传输到客户端的数据是否已经传输完毕。确认数据传输完毕后才进行断开，向客户端发送 [FIN，ACK] 报文。

问题三：为什么要在TIME_WAIT等待2MSL时间？
	MSL是报文在网络上生存的最大时间，超过阀值便将报文丢弃。在TIME_WAIT等待2MSL主要是为了确认被动关闭方能够顺利进入CLOSED状态（如果主动方发出第4次握手的数据之后，直接进入CLOSED状态，但被动方并没有收到第4次握手的数据时，被动方会一直重发第3次握手的数据，由于主动方已经CLOSED，被动方不会停止重发数据）



### [Tcp如何保证可靠性](https://www.jianshu.com/p/42dbcd39c3e7) 

- 校验和

- 序列号与确认应答（TCP将每个数据包都进行了编号，这就是序列号）

- 超时重传

- 流量控制（TCP支持根据接收端的处理能力，来决定发送端的发送速度，这个机制叫做流量控制）

- 拥塞控制（慢启动、拥塞避免、快恢复、快重传）

  <img src="https://gitee.com/senbird/typora_pic/raw/master/pic/5021195-991a69df2dbf5ff7.png" alt="img" style="zoom:50%;" />



### [滑动窗口](https://blog.csdn.net/qq_34501940/article/details/51180268)

- 停等协议
- 后退N帧协议（需要重发出错帧及其后面的所有数据帧。这样有可能有把正确的数据帧重传一遍，降低了传送效率）
- 选择重传协议（发送端接收到NACK时，只发送出错的帧）

### [Cookie与Session](https://www.cnblogs.com/l199616j/p/11195667.html)

​	会话（Session）跟踪是Web程序中常用的技术，用来跟踪用户的整个会话。常用的会话跟踪技术是Cookie与Session。Cookie通过在客户端记录信息确定用户身份，Session通过在服务器端记录信息确定用户身份。

>​	Web应用程序是使用HTTP协议传输数据的。HTTP协议是无状态的协议。一旦数据交换完毕，客户端与服务器端的连接就会关闭，再次交换数据需要建立新的连接。这就意味着服务器无法从连接上跟踪会话。即用户A购买了一件商品放入购物车内，当再次购买商品时服务器已经无法判断该购买行为是属于用户A的会话还是用户B的会话了。要跟踪该会话，必须引入一种机制。
>
>　　Cookie就是这样的一种机制。它可以弥补HTTP协议无状态的不足。在Session出现之前，基本上所有的网站都采用Cookie来跟踪会话

1、Cookie

​	Cookie实际上是一小段的文本信息。客户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器颁发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容。

>​	Java中把Cookie封装成了javax.servlet.http.Cookie类。每个Cookie都是该Cookie类的对象。服务器通过操作Cookie类对象对客户端Cookie进行操作。通过request.getCookie()获取客户端提交的所有Cookie（以Cookie[]数组形式返回），通过response.addCookie(Cookiecookie)向客户端设置Cookie。
>
>　　Cookie对象使用key-value属性对的形式保存用户状态，一个Cookie对象保存一个属性对，一个request或者response同时使用多个Cookie。因为Cookie类位于包javax.servlet.http.*下面，所以JSP中不需要import该类。

​	Cookie的maxAge决定着Cookie的有效期，单位为秒（Second）。Cookie中通过getMaxAge()方法与setMaxAge(int maxAge)方法来读写maxAge属性。
​	如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效。浏览器会将maxAge为正数的Cookie持久化，即写到对应的Cookie文件中。无论客户关闭了浏览器还是电脑，只要还在maxAge秒之前，登录网站时该Cookie仍然有效。
​	如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该Cookie即失效。maxAge为负数的Cookie，为临时性Cookie，不会被持久化，不会被写到Cookie文件中。

2、Session

​	如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

>​	Session对应的类为javax.servlet.http.HttpSession类。每个来访者对应一个Session对象，所有该客户的状态信息都保存在这个Session对象里。Session对象是在客户端第一次请求服务器的时候创建的。Session也是一种key-value的属性对，通过getAttribute(Stringkey)和setAttribute(String key，Objectvalue)方法读写客户状态信息。Servlet里通过request.getSession()方法获取该客户的Session

​	Session在用户第一次访问服务器的时候自动创建。需要注意只有访问JSP、Servlet等程序时才会创建Session，只访问HTML、IMAGE等静态资源并不会创建Session。如果尚未生成Session，也可以使用request.getSession(true)强制生成Session。

　　Session生成后，只要用户继续访问，服务器就会更新Session的最后访问时间，并维护该Session。用户每访问服务器一次，无论是否读写Session，服务器都认为该用户的Session“活跃（active）”了一次。







# JVM

​	Java同时采用了c、c++的编译式特点和python的解释型特点，Java代码首先被编译成字节码，并生成类文件（后缀为.class的文件），然后，Java虚拟机会为底层的平台解释类文件。运行于任何平台和操作系统的任意版本虚拟机，都能执行相同的类文件。

> 与虚拟机相似的是，JVM也会在宿主机上创建一个隔离的空间。该空间能够执行Java程序，且不受这台机器上的平台或操作系统影响。（我们把虚拟机成为客户机（guest machine），物理计算机称为宿主机（host machine））

​	更多JVM面试题参考https://blog.csdn.net/qq_42358647/article/details/106589909

## Java虚拟机架构

参考https://www.cnblogs.com/hubuhuang/articles/14774182.html

Java虚拟机由三个不同的部件构成：

- 类加载器 （Class Loader）
- 运行时内存/数据区（Runtime Memory/Data Area）
- 执行引擎（Execution Engine）

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20210516004652386.png" alt="img" style="zoom:80%;" />



> 上图中绿色的两个部件简单介绍一下：
>
> 1、Java本地接口（Java Native Interface）
>
> ​	有时，有必要使用本地（非Java）代码（例如C / C ++）。 这可能是在我们需要与硬件交互或克服Java中的内存管理和性能约束的情况下。 Java支持通过Java本地接口（JNI）执行本地代码。
>
> ​	JNI充当了桥梁，以允许使用其他编程语言（例如C，C ++等）的支持包。 这在需要编写Java不完全支持的代码（例如某些只能用C编写的平台特定功能）的情况下特别有用。
>
> ​	您可以使用native关键字指示方法实现将由本地库提供。 您还需要调用System.loadLibrary()将共享的本地库加载到内存中，并使它的功能可用于Java。
>
> 2、本地方法库（Native Method Libraries）
>
> ​	本机方法库是以其他编程语言（例如C，C ++和汇编语言）编写的库。 这些库通常以.dll或.so文件的形式存在。 这些本机库可以通过JNI加载。

## 类加载器

​	当你编译一个Java源文件，它会被编译成字节码文件。在你的程序中，当你尝试使用这个类时，类加载器会把它加载到内存。
​	通常，含有main方法的类会被第一个加载到内存中。

### 类加载过程

​	包含三个阶段：加载（loading），链接（linking），初始化（initialization）

（1）加载（Loading）

​	加载是通过一个指定的名称（全限定名称），获得一个类或接口的二进制表示（字节码），并通过它生成原始类或接口。实现这个动作的代码模块称为“类加载器”。

> 类加载器分为以下几种：
>
> Ⅰ、启动类加载器（Bootstrap ClassLoader）：
>
> ​	使用 C++ 实现，是虚拟机自身的一部分，其他的类加载器均使用 Java 实现，独立于虚拟机，并且全部继承自抽象类 java.lang.ClassLoader。
> ​	这个类加载器负责将存放在 <JRE_HOME>\lib 目录中的，或者被 -Xbootclasspath 参数所指定的路径中的，并且是虚拟机识别的（仅按照文件名识别，如 rt.jar，名字不符合的类库即使放在 lib 目录中也不会被加载）类库加载到虚拟机内存中。
>
> ​	启动类加载器无法被 Java 程序直接引用，用户在编写自定义类加载器时，如果需要把加载请求委派给启动类加载器，直接使用 null 代替即可。
> Ⅱ、扩展类加载器（Extension ClassLoader）：
>
> ​	它负责将 <JAVA_HOME>/lib/ext 或者被 java.ext.dir 系统变量所指定路径中的所有类库加载到内存中，开发者可以直接使用扩展类加载器。
> Ⅲ、应用程序类加载器（Application ClassLoader）：
>
> ​	它负责加载用户类路径（ClassPath）上所指定的类库，开发者可以直接使用这个类加载器，如果应用程序中没有自定义过自己的类加载器，一般情况下这个就是程序中默认的类加载器。由于这个类加载器是 ClassLoader 中的 getSystemClassLoader() 方法的返回值，因此一般称为系统类加载器。

（2）链接（Linking）

​	类被加载到内存之后，会经历链接过程。链接一个类或接口是把程序的不同元素和依赖组合在一起。

​	链接包行下面这些步骤：

​	Ⅰ、验证（Verification）：这个阶段通过检查一系列约束或规则检查 .class 文件的结构是否正确。

​	Ⅱ、准备（Preparation）：在这个阶段，JVM会为一个类或接口的静态字段分配内存，并用默认值初始化它们。

​	Ⅲ、解析（Resolution）：在这个阶段，符号引用被运行时常量池（runtime constant pool）中的直接引用替换。
​		例如：如果你引用其它类或在其它类中的常量，它们会被解析替换成它们实际上的引用。

（3）初始化（Initialization）

​	初始化是执行类或接口的初始方法（称为< clinit >）。它包括调用类的构造器（constructor），执行静态代码块，为所有的静态变量赋值。这是类加载的最后一个阶段。

例如，下方是前面所声明的变量：

```java
private static final boolean enabled = true;
```

在准备阶段，变量被设为默认值false。在初始化阶段，该变量被分配它实际的值true。

> **注意**：JVM是多线程的，多个线程在相同的时间初始化相同的类是有可能的。这会导致并发问题，你需要处理线程安全以确保程序能在多线程环境中正常运行。

### 双亲委派模型

参考https://blog.csdn.net/u013568373/article/details/93995246

​	双亲委派模型要求除了顶层的启动类加载器外，其余的类加载器都应当有自己的父类加载器，类加载器间的关系如下：

> 双亲委派模型中的“父子关系”并非通常所说的“类继承关系”，而是采用组合关系来复用父类加载器的相关代码

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/5982616-aad63782162c9ae5.png" alt="img" style="zoom: 50%;" />

​	其工作原理的是，如果一个类加载器收到了类加载请求，它并不会自己先去加载，而是把这个请求委托给父类的加载器去执行，如果父类加载器还存在其父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器，如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派模型。

>一言概之，双亲委派模型，其实就是一种类加载器的层次关系

1、双亲委派模型的好处

（1）效率方面，避免了类的<font color=red>重复加载</font>：
	采用双亲委派模式的好处是Java类随着它的类加载器一起具备了一种带有优先级的层次关系，通过这种层级关系可以避免类的重复加载，当父ClassLoader已经加载了该类时，就没有必要子ClassLoader再加载一次。

> ​	内存是宝贵的，没必要保存相同的两份 Class 对象，例如 System.out.println() ，实际我们需要一个 System 的 Class 对象，并且只需要一份，如果不使用委托机制，而是自己加载自己的，那么类 A 打印的时候就会加载一份 System 字节码，类 B 打印的时候又会加载一份 System 字节码。而使用委托机制就可以有效的避免这个问题。
>
> ​	再例如 java.lang.Object 存放在 rt.jar 中，如果编写另外一个 java.lang.Object 并放到 ClassPath 中，程序可以编译通过。由于双亲委派模型的存在，所以在 rt.jar 中的 Object 比在 ClassPath 中的 Object 优先级更高，这是因为 rt.jar 中的 Object 使用的是启动类加载器，而 ClassPath 中的 Object 使用的是应用程序类加载器。rt.jar 中的 Object 优先级更高，那么程序中所有的 Object 都是这个 Object。

（2）安全方面，防止了java核心API库被<font color=red>随意替换</font>：
	假设通过网络传递一个名为java.lang.Integer的类，通过双亲委托模式传递到启动类加载器，而启动类加载器在核心Java API发现这个名字的类，发现该类已被加载，并不会重新加载网络传递过来的java.lang.Integer，而直接返回已加载过的Integer.class，这样便可以防止核心API库被随意篡改。

## 运行时数据区

参考https://blog.csdn.net/wdong_love_cl/article/details/51597854

Java虚拟机管理的内存包括五个运行时数据区域：

>java虚拟机规范定义了java运行时数据区在概念上应该有的分区，这是抽象概念不对应也不限制物理上的具体实现，不同的虚拟机可以有不同的实现

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/2269232-e96d2745ac13a6a7.png" alt="img" style="zoom:80%;" />

其中：（主要了解下述前三个，即方法区、堆区、栈区）

### 方法区

​	类级别的所有数据，如运行时常量池、已被虚拟机加载的类信息、静态变量、即时编译器编译后的代码，都存储在这里。方法区在虚拟机启动时被创建，一个JVM只有一个方法区。

### 堆区

​	堆内存区域的目的就是存放对象实例以及数组（当然，数组引用是存放在Java栈中的），几乎所有的对象实例都在这里分配内存。堆区在虚拟机启动时被创建，一个JVM只有一个堆区。它是java内存最大的一块，也是垃圾回收器（GC）回收所针对的地方。
​	Java堆可以处于物理上不连续的内存空间中，只要逻辑上是连续的即可。在实现时，既可以实现成固定大小的，也可以是可扩展的，不过当前主流的虚拟机都是按照可扩展来实现的（通过-Xmx和-Xms 控制）。如果在堆中没有内存完成实例分配，并且堆也无法再扩展时，将会抛出OutOfMemoryError 异常。

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20200606202759112.jpg" alt="img" style="zoom:80%;" />

​	运行时数据区属于逻辑概念，在实现虚拟机的时候，考虑垃圾回收效率，将JVM内存划分为三块：元数据区、老年代、新生代；注意这里的分代概念和运行时数据区是两个不同层次和标准的概念，是两套概念。（因为永久代的概念已被淡化，主要就是老年代和新生代，而老年代和新生代是堆的主要组成，所以放在这里介绍）

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20200617121022404.png)

>java运行时内存按 抽象逻辑 和 内存回收实现上 划分了两套概念,他们之间可以有一定的对应关系,但不是确定的,jdk8就将运行时常量池从永久代移除了。
>
>共享内存区划分
>
>- 共享内存区 = 持久代 + 堆
>- 持久代 = 方法区 + 其他
>- Java堆 = 老年代 + 新生代

#### 永久代

​	永久代（持久代）在JDK7之前包含方法区，是一块与堆分离的区域；JDK7将静态变量从永久代移到堆中；JDK8则完全取消永久代，方法区存在元空间MetaSpace中，虽然与堆共享一块内存，逻辑上可以认为在堆中，但仍然与堆不相连。

#### 老年代

​	老年代存储长期存活的对象和大对象。年轻代中存储的对象，经过多次GC后仍然存活的对象会移动到老年代中进行存储。老年代空间占满后，会触发Major GC。

|          | 用于清理       | 采用的GC算法             | 为什么采用该GC算法                                           | 其他                                                         |
| -------- | -------------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Minor GC | 新生代         | 复制算法                 | 在新生代中，每次垃圾收集时都发现有大批对象死去，只有少量存活 |                                                              |
| Major GC | 老年代         |                          |                                                              | Major GC发生过程常常伴随一次Minor GC                         |
| Full GC  | 新生代和老年代 | 标记-清除或标记-整理算法 | 在老年代中，对象存活率高、没有额外空间对它进行分配担保，所以不能用复制算法 | 如果Full GC之后，堆中仍然无法存储对象，就会抛出OutOfMemoryError异常 |

​	老年代里面的对象几乎个个都是在 Survivor 区域中熬过来的，它们是不会那么容易就 “死掉” 了的。因此，Full GC 发生的次数不会有 Minor GC 那么频繁，并且做一次 Full GC 要比进行一次 Minor GC 的时间更长。

> ​	虚拟机提供了一个`XX:PretenureSizeThreshold`参数，令大于这个设置值的对象（大对象）直接在老年代分配，这样做的目的是避免在Eden区及两个Survivor区之间发生大量的内存复制。（所谓大对象是指，需要大量连续内存空间的Java对象，最典型的大对象就是那种很长的字符串以及数组）

#### 新生代

​	新生代（年轻代）包含Eden(伊甸园)、S0(0号幸存区、FromSpace)、S1(1号幸存区、ToSpace)。
​	年轻代存储“新生对象”，我们新创建的对象存储在年轻代中。当年轻代内存占满后，会触发Minor GC，清理年轻代内存空间。

1、为什么要分为Eden和Survivor?为什么要设置两个Survivor区？

​	如果没有Survivor，Eden区每进行一次Minor GC，存活的对象就会被送到老年代。老年代很快被填满，触发Major GC。老年代的内存空间远大于新生代，进行一次Full GC消耗的时间比Minor GC长得多,所以需要分为Eden和Survivor。
​	Survivor的存在意义，就是减少被送到老年代的对象，进而减少Full GC的发生，Survivor的预筛选保证，只有经历16次Minor GC还能在新生代中存活的对象，才会被送到老年代。
​	设置两个Survivor区最大的好处就是解决了<font color=red>碎片化</font>，刚刚新建的对象在Eden中，经历一次Minor GC，Eden中的存活对象就会被移动到第一块survivor space S0，Eden被清空；等Eden区再满了，就再触发一次Minor GC，Eden和S0中的存活对象又会被复制送入第二块survivor space S1（这个过程非常重要，因为这种复制算法保证了S1中来自S0和Eden两部分的存活对象占用连续的内存空间，避免了碎片化的发生）。过程可以参考如下图示：

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20190909233116357.png)

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20190910133921440.png)

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/2019091013412270.png)

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20190910134231819.png)

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/2019090923325076.png)

>上图参考：https://blog.csdn.net/u012988901/article/details/100630491

2、JVM中一次完整的GC流程是怎样的，对象如何晋升到老年代？

​	上面的图示过程已经回答了。

>​	关于晋升到老年代的年龄问题：为了能更好地适应不同程度的内存状况，虚拟机并不是永远地要求对象的年龄必须达到 `MaxPretenuringThreshold`（默认是15）才能晋升老年代，如果Survivor空间中相同年龄所有对象大小的总和大于Survivor空间的一半，年龄大于或等于该年龄的对象就可以直接进入老年代，无需等到`MaxPretenuringThreshold`中要求的年龄。



### 栈区

（也叫java栈、虚拟机栈）

​	在JVM中，每当创建一个新的线程，就会在相同时刻创建一个独立的运行时栈。所有的局部变量，方法调用以及部分结果都会被存储在栈中。
​	对于每个方法调用，都会在栈内存中创建一个条目，称为栈帧。 方法调用完成后，栈框将被销毁。

> 栈区不是共享的，栈是线程私有的，他的生命周期与线程相同，所以它是线程安全的。

1、什么情况下会发生栈内存溢出？

思路： 描述栈定义，再描述为什么会溢出

​	栈是线程私有的，他的生命周期与线程相同，每个方法在执行的时候都会创建一个栈帧，用来存储局部变量表，操作数栈，动态链接，方法出口等信息。局部变量表又包含基本数据类型，对象引用类型
​	如果线程请求的栈深度大于虚拟机所允许的最大深度，将抛出StackOverflowError（SOF）异常，方法递归调用产生这种结果。
​	如果Java虚拟机栈可以动态扩展，并且扩展的动作已经尝试过，但是无法申请到足够的内存去完成扩展，或者在新建立线程的时候没有足够的内存去创建对应的虚拟机栈，那么Java虚拟机将抛出一个OutOfMemory（OOM）异常。(线程启动过多)

>​	内存泄露：指程序中动态分配内存给一些临时对象，但是对象不会被GC所回收，它始终占用内存。即被分配的对象可达但已无用。
>
>​	内存溢出：指程序运行过程中无法申请到足够的内存而导致的一种错误。
>
>​	从定义上可以看出内存泄露是内存溢出的一种诱因，不是唯一因素。



### 本地方法栈

​	Native Method Stacks，JVM包含支持本地方法的栈，这些方法不是用Java语言写的，而是C或C++等其它语言。每创建一个新的线程，都会创建一个独立的本地方法栈。

> 本地方法栈与Java栈的作用是非常相似的，它们之间的区别不过是Java栈执行Java方法，本地方法栈执行的是本地方法（有的虚拟机把本地方法栈和虚拟机栈合二为一）。

### 程序计数器

​	JVM能同时支持多个线程。每个线程都有自己的程序计数器（Program Counter Registers，是字节码的行号指示器），用于保存当前线程所执行的JVM指令的地址。一旦该指令被执行，程序计数器会更新到下一条。

### 直接内存

​	直接内存（Direct Memory）就是Java堆外内存。

​	直接内存并<font color=red>不是JVM运行时数据区的一部分，也不是Java虚拟机规范中定义的内存区域</font>，但是这部分内存也被频繁地使用，而且<font color=red>也可能导致OutOfMemoryError异常出现</font>，所以我们放到这里一起讲解。

​	在JDK 1.4中新加入了NIO（New Input/Output）类，引入了一种基于通道（Channel）与缓冲区（Buffer）的I/O方式，它可以<font color=red>使用Native函数库直接分配堆外内存，然后通过一个存储在Java堆里面的DirectByteBuffer对象作为这块内存的引用进行操作</font>。这样能在一些场景中显著提高性能，因为避免了在Java堆和Native堆中来回复制数据。

​	显然，本机直接内存的分配不会受到Java堆大小的限制，但是，既然是内存，则肯定还是会受到本机总内存（包括RAM及SWAP区或者分页文件）的大小及处理器寻址空间的限制。服务器管理员配置虚拟机参数时，一般会根据实际内存设置-Xmx等参数信息，但经常会忽略掉直接内存，使得各个内存区域的总和大于物理内存限制（包括物理上的和操作系统级的限制），从而导致动态扩展时出现OutOfMemoryError异常。

>​	NIO的Buffer提供了一个可以不经过JVM内存直接访问系统物理内存的类——DirectBuffer。 DirectBuffer类继承自ByteBuffer，但和普通的ByteBuffer不同，普通的ByteBuffer仍在JVM堆上分配内存，其最大内存受到最大堆内存的限制；而DirectBuffer直接分配在物理内存中，并不占用堆空间，其可申请的最大内存受操作系统限制。
>
>​	DirectBuffer并没有真正向OS申请分配内存，其最终还是通过调用Unsafe的allocateMemory()来进行内存分配。不过JVM对Direct Memory可申请的大小也有限制，可用-XX:MaxDirectMemorySize=1M设置，这部分内存不受JVM垃圾回收管理。

1、使用直接内存的好处/适用场景

（1）提升程序I/O操作的性能
	Java如果和外界通讯，把Java 堆中的内容传输到外界，则需要把Java堆复制到非Java堆，如果使用native堆，则避免了内容在Java堆和非Java堆之间的copy。

（2）对垃圾回收停顿的改善
	由于堆外内存是直接受操作系统管理而不是JVM，所以当我们使用堆外内存时，可以在GC时减少回收停顿对于应用的影响。

> 但同时也带来了一个问题，非Java堆的回收不受GC的影响，一般需要手工进行回收。如果大量的使用非Java堆，则丢失了Java 自动垃圾回收的特点。

2、DirectBuffer和ByteBuffer的对比

|              | 分配的内存位置 | 内存大小受谁限制                                             | 创建速度 | 读写速度 | 创建的代码示例                                               |
| ------------ | -------------- | ------------------------------------------------------------ | -------- | -------- | ------------------------------------------------------------ |
| DirectBuffer | 堆外           | 物理总内存和寻址空间（JVM对Direct Memory可申请的大小也有限制：-XX:MaxDirectMemorySize） |          | 较快     | ByteBuffer buffer = ByteBuffer.allocateDirect(500);//分配500个字节的DirectBuffer |
| ByteBuffer   | 堆内           | java堆                                                       | 较快     |          | ByteBuffer buffer = ByteBuffer.allocate(500);//分配500个字节的ByteBuffer |



## 执行引擎

​	当字节码被载入内存，并且它的详细信息可在运行时数据区获得的时候，下一步就是运行程序。执行引擎（Execution Engine）通过执行每个类中的代码来完成这一步。然而，在执行程序之前，字节码需要被转换成机器代码指令。JVM可以将解释器或JIT编译器用于执行引擎。

### 解释器

​	解释器（Interpreter）逐行读取并解释字节码指令。由于是逐行执行，解释器相对较慢。
​	解释器的另一个缺点是，当多次调用某个方法时，每次都需要进行新的解释。

### JIT 编译器

​	JIT编译器（JIT Compiler，即时编译器）克服了解释器的缺点。 执行引擎首先使用解释器执行字节代码，但是当发现重复的代码时，它将使用JIT编译器。然后，JIT编译器将编译整个字节码，并将其更改为本地机器代码。 此本地机器代码直接用于重复的方法调用，从而提高了系统的性能。（JIT编译器是JRE的一部分）

​	JIT编译器具有以下组件：
​		中间代码生成器（Intermediate Code Generator）——生成中间代码
​		代码优化器（Code Optimizer）——优化中间代码以获得更好的性能
​		目标代码生成器（Target Code Generator）——将中间代码转换为本地机器代码
​		剖析器（Profiler）——查找热点（重复执行的代码）

​	为了更好地理解解释器和JIT编译器之间的区别，假定您具有以下代码：

```java
int sum = 10;
for(int i = 0 ; i <= 10; i++) {
   sum += i;
}
System.out.println(sum);
```

​	解释器将为循环中的每次迭代从内存中获取sum的值，将i的值添加到其中，然后将其写回到内存中。 这是一项昂贵的操作，因为它每次进入循环都会访问内存。
​	但是，JIT编译器将识别出此代码具有HotSpot，并将对其进行优化。 它将在线程的程序计数器中存储sum的本地副本，并将在循环中继续将i的值添加到该副本中。 一旦循环完成，它将把sum的值写回到内存中。

> 注意：与解释器逐行解释代码相比，JIT编译器花费更多的时间来编译代码。 如果您只打算运行一次程序，那么使用解释器会更好。

### 垃圾回收器

​	垃圾回收器（Garbage Collector）收集并从堆区域中删除未引用的对象。 它是通过销毁运行时未使用的内存来自动回收它们的过程。

>​	垃圾回收器收集并删除未引用的对象。可以通过调用*"System.gc()"*来触发垃圾回收，但并不保证会确实进行垃圾回收。JVM的垃圾回收只收集那些由**new**关键字创建的对象。所以，如果不是用**new**创建的对象，你可以使用**finalize函数**来执行清理。

参考https://www.jianshu.com/p/23f8249886c6 和 https://blog.csdn.net/aijiudu/article/details/72991993

#### 垃圾判断算法

1、引用计数法（JVM未采用）

​	给每个对象添加一个计数器，当有地方引用该对象时计数器加1，当引用失效时计数器减1。用对象计数器是否为0来判断对象是否可被回收。

​	缺点：无法解决循环引用的问题。

​	引用计数算法是将垃圾回收分摊到整个应用程序的运行当中了，而不是在进行垃圾收集时，要挂起整个应用的运行，直到对堆中所有对象的处理都结束。因此，采用引用计数的垃圾收集不属于严格意义上的`Stop-The-World`的垃圾收集机制。

​	看似很美好，但我们知道JVM的垃圾回收就是`Stop-The-World`的，那是什么原因导致我们最终放弃了引用计数算法呢--无法解决循环应用的问题。

>循环引用引起内存泄漏问题（也称死锁，即，当两个对象相互引用，那么这两个指针的引用计数永远不可能下降为0，资源永远不会释放）

2、可达性分析算法

​	通过`GC ROOT`的对象作为搜索起始点，通过引用向下搜索，所走过的路径称为引用链。通过对象是否有到达引用链的路径来判断对象是否可被回收。

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/2269232-97bf646f648d6ff7.jpg" alt="img" style="zoom:80%;" />

> 通过可达性算法，成功解决了引用计数所无法解决的循环依赖问题，只要你无法与`GC Root`建立直接或间接的连接，系统就会判定你为可回收对象。那这样就引申出了另一个问题，哪些属于GC Root。

可作为`GC ROOT`的对象：

（1）虚拟机栈中引用的对象：比如

```java
public class StackLocalParameter {
  public StackLocalParameter(String name) {}
  public static void testGC() {
    StackLocalParameter s = new StackLocalParameter("localParameter");//此时的s，即为GC Root
    s = null;//当s置空时，localParameter对象也断掉了与GC Root的引用链，将被回收。
  }
}
```

（2）方法区中类静态属性引用的对象 或 常量引用的对象：比如

```java
public class MethodAreaStaicProperties {
  public static MethodAreaStaicProperties m;//方法区中类的静态属性
  public MethodAreaStaicProperties(String name) {}
  public static void testGC(){
    MethodAreaStaicProperties s = new MethodAreaStaicProperties("properties");
    s.m = new MethodAreaStaicProperties("parameter");
    s = null;//此时的s，即为GC Root，s置为null，经过GC后，s所指向的properties对象由于无法与GC Root建立关系被回收。而m作为类的静态属性，也属于GC Root，parameter 对象依然与GC root建立着连接，所以此时parameter对象并不会被回收。
  }
}
```

（3）本地方法栈中JNI引用的对象

#### 垃圾回收算法

1、 标记-清除算法

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/2269232-5b023b00f7bf8f1b.jpg" alt="img" style="zoom:80%;" />

​	标记清除算法（Mark-Sweep）是最基础的一种GC算法，它分为2部分，先把内存区域中的这些对象进行标记，哪些属于可回收标记出来，然后把这些垃圾拎出来清理掉。就像上图一样，清理掉的垃圾就变成未使用的内存区域，等待被再次使用。
​	但它存在一个很大的问题，那就是内存碎片。

2、复制算法

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/2269232-46c30f2ffb8c18af.jpg" alt="img" style="zoom:80%;" />

​	复制算法（Copying）是在标记清除算法基础上演化而来，解决标记清除算法的内存碎片问题。它将可用内存划分为两块（空闲区域和活动区域），每次只使用其中的一块。第一步还是标记（标记谁是可达的对象），标记之后把可达的对象复制到空闲区，将空闲区变成活动区，同时把以前活动区对象清除掉，变成空闲区。它保证了内存的连续可用，内存分配时也就不用考虑内存碎片等复杂情况。

​	但复制算法暴露了另一个问题，例如硬盘本来有500G，但却只能用200G，代价实在太高。

3、标记-整理算法

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/2269232-d7cb73cb0e50c060.jpg" alt="img" style="zoom:80%;" />

​	标记-整理算法标记过程仍然与标记-清除算法类似，只不过在标记和清除之间做了一次整理。标记整理算法解决了内存碎片的问题，也规避了复制算法只能利用一半内存区域的弊端。

​	但标记整理算法对内存变动更频繁，需要整理所有存活对象的引用地址，在效率上比复制算法要差很多。

|               | 内存碎片 | 内存利用率 | 执行效率 |
| ------------- | -------- | ---------- | -------- |
| 标记-清除算法 | 最严重   |            |          |
| 复制算法      |          | 最低       |          |
| 标记-整理算法 |          |            | 最低     |

4、分代收集算法

​	分代收集算法分代收集算法严格来说并不是一种思想或理论，而是融合上述3种基础的算法思想，而产生的针对不同情况所采用不同算法的一套组合拳，根据对象存活周期的不同将内存划分为几块。

- 在新生代中，每次垃圾收集时都发现有大批对象死去，只有少量存活，那就选用复制算法，只需要付出少量存活对象的复制成本就可以完成收集。
- 在老年代中，因为对象存活率高、没有额外空间对它进行分配担保，就必须使用标记-清理算法或者标记-整理算法来进行回收。

#### 垃圾回收器

七大垃圾回收器：（着重了解第六和第七个）

1、Serial（串行）垃圾收集器：单线程，复制算法

​	Serial垃圾收集器基于复制算法实现，它是一个单线程收集器，在它正在进行垃圾收集时，必须暂停其他所有工作线程，直到垃圾收集结束。Serial垃圾收集器采用了复制算法，简单、高效，对于单CPU运行环境来说，没有线程交互开销，可以获得最高的单线程垃圾收集效率，因此Serial垃圾收集器是Java虚拟机运行在Client模式下的新生代的默认垃圾收集器。

2、ParNew垃圾收集器：多线程，复制算法

​	ParNew垃圾收集器是Serial垃圾收集器的多线程实现，同样采用了复制算法，它采用多线程模式工作，除此之外和Serial收集器几乎一样。ParNew垃圾收集器在垃圾收集过程中会暂停所有其他工作线程，是Java虚拟机运行在Server模式下的新生代的默认垃圾收集器。

3、Parallel Scavenge垃圾收集器：多线程，复制算法

​	ParallelScavenge收集器是为提高新生代垃圾收集效率而设计的垃圾收集器，基于多线程复制算法实现，在系统吞吐量上有很大的优化，所谓吞吐量就是CPU用于运行用户代码的时间与CPU总消耗时间的比值, 可以更高效地利用CPU尽快完成垃圾回收任务。

4、Serial Old垃圾收集器：单线程，标记整理算法

​	Serial Old垃圾收集器是Serial垃圾收集器的老年代实现，同Serial一样采用单线程执行，不同的是，SerialOld针对老年代长生命周期的特点基于标记整理算法实现。SerialOld垃圾收集器是JVM运行在Client模式下的老年代的默认垃圾收集器。

5、Parallel Old垃圾收集器：多线程，标记整理算法

​	ParallelOld垃圾收集器采用多线程并发进行垃圾回收，它根据老年代长生命周期的特点，基于多线程的标记整理算法实现。ParallelOld垃圾收集器在设计上优先考虑系统吞吐量，其次考虑停顿时间等因素

6、CMS垃圾收集器 : 标记清除算法

​	CMS（Concurrent MarkSweep）垃圾收集器是为老年代设计的垃圾收集器，其主要目的是达到最短的垃圾回收停顿时间，基于线程的标记清除算法实现，以便在多线程并发环境下以最短的垃圾收集停顿时间提高系统的稳定性。

CMS的工作机制相对复杂，垃圾回收过程包含如下4个步骤。
（1）初始标记：只标记和GC Roots直接关联的对象，速度很快，需要暂停所有工作线程。
（2）并发标记：和用户线程一起工作，执行GC Roots跟踪标记过程，不需要暂停工作线程。
（3）重新标记：在并发标记过程中用户线程继续运行，导致在垃圾回收过程中部分对象的状态发生变化，为了确保这部分对象的状态正确性，需要对其重新标记并暂停工作线程。
（4）并发清除：和用户线程一起工作，执行清除GC Roots不可达对象的任务，不需要暂停工作线程。

7、G1垃圾收集器

​	G1（GarbageFirst）垃圾收集器为了避免全区域垃圾收集引起的系统停顿，将堆内存划分为大小固定的几个独立区域，独立使用这些区域的内存资源并且跟踪这些区域的垃圾收集进度，同时在后台维护一个优先级列表，在垃圾回收过程中根据系统允许的最长垃圾收集时间，优先回收垃圾最多的区域。G1垃圾收集器通过内存区域独立划分使用和根据不同优先级回收各区域垃圾的机制，确保了G1垃圾收集器在有限时间内获得最高的垃圾收集效率。相对于CMS收集器，G1垃圾收集器两个突出的改进。

- 基于标记整理算法，不产生内存碎片。
- 可以精确地控制停顿时间，在不牺牲吞吐量的前提下实现短停顿垃圾回收。

|                   | 针对           | GC算法        | 线程 | 特点                                                         | stop the world | JVM的默认收集器 |
| ----------------- | -------------- | ------------- | ---- | ------------------------------------------------------------ | -------------- | --------------- |
| Serial            | 新生代         | 复制算法      | 单   | 简单、高效                                                   | √              | Client模式下    |
| ParNew            | 新生代         | 复制算法      | 多   | 是Serial垃圾收集器的多线程实现                               | √              | Server模式下    |
| Parallel Scavenge | 新生代         | 复制算法      | 多   | 在系统吞吐量上有很大的优化                                   |                |                 |
| Serial Old        | 老年代         | 标记-整理算法 | 单   | 简单                                                         |                | Client模式下    |
| Parallel Old      | 老年代         | 标记-整理算法 | 多   | 在设计上优先考虑系统吞吐量，其次考虑停顿时间                 |                |                 |
| CMS               | 老年代         | 标记-清除算法 |      | 以最小的停顿时间为目标                                       |                |                 |
| G1                | 老年代和新生代 | 标记-整理算法 |      | 在不牺牲吞吐量的前提下实现短停顿垃圾回收（优先回收垃圾最多的区域） |                |                 |

> 至于各种算法的优缺点，还可以结合所使用的GC算法来展开讲，比如CMS算法因为采用了标记-清除算法，就容易产生内存碎片。

## 其他面试问题

1、Java对象在虚拟机中的创建过程与访问定位的方式

下面以最流行的HotSpot虚拟机以及常用的内存区域Java堆为例来探讨在虚拟机中对象的创建和对象的访问等问题。

>HotSpot VM是Sun JDK和OpenJDK中所带的虚拟机，也是目前使用范围最广的Java虚拟机

（1）对象在虚拟机中的创建过程：

- 检查虚拟机是否加载了所要new的类，若没加载，则首先执行相应的类加载过程；
- 在类加载检查通过后，对象所需内存的大小在类加载完成后便可确定，虚拟机就会为新生对象分配内存。一般来说，根据Java堆中内存是否绝对规整，内存的分配有两种方式：
  - 指针碰撞：如果Java堆中内存绝对规整，所有用过的内存放在一边，空闲内存放在另一边，中间一个指针作为分界点的指示器，那分配内存就仅仅是把那个指针向空闲空间那边挪动一段与对象大小相同的距离。
  - 空闲列表：如果Java堆中内存并不规整，那么虚拟机就需要维护一个列表，记录哪些内存块是可用的，以便在分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的记录。
- 内存分配完成后，虚拟机需要将分配到的内存空间都初始化为零值；
- 执行<init>方法把对象按照程序员的意愿进行初始化，从而产生一个真正可用的对象。

（2）对象在虚拟机中的访问定位的方式：

​	创建对象是为了使用对象，我们的Java程序通过栈上的reference数据来操作堆上的具体对象。在虚拟机规范中，reference类型中只规定了一个指向对象的引用，并没有定义这个引用使用什么方式去定位、访问堆中的对象的具体位置。目前的主流的访问方式有使用句柄访问和直接指针访问两种。

- 句柄访问：Java堆中会划分出一块内存作为句柄池，栈中的reference指向对象的句柄地址，句柄中包含了对象实例数据和类型数据各自的具体地址信息，如下图

  <img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20170505200615074" alt="这里写图片描述" style="zoom:80%;" />

- 直接指针访问：reference中存储的就是对象地址，如下图

  <img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20170505200629589" alt="这里写图片描述" style="zoom:80%;" />

  >总的来说，这两种对象访问定位方式各有千秋。使用句柄访问的最大好处就是reference中存储的是稳定的句柄地址，对象被移动（垃圾收集时移动对象是非常普遍的行为）时只会改变句柄中的实例数据指针，reference本身不需要修改；而使用直接指针访问的最大好处就是速度快，节省了一次指针定位的时间开销。

2、说说你知道的几种主要的JVM参数

> 怎么配置：https://baijiahao.baidu.com/s?id=1662230509071930868&wfr=spider&for=pc

1）堆栈配置相关
-Xmx3550m： 最大堆大小为3550m。
-Xms3550m： 设置初始堆大小为3550m。
-Xmn2g： 设置年轻代大小为2g。
-Xss128k： 每个线程的堆栈大小为128k。
-XX:MaxPermSize： 设置持久代大小为16m
-XX:NewRatio=4: 设置年轻代（包括Eden和两个Survivor区）与年老代的比值（除去持久代）。
-XX:SurvivorRatio=4： 设置年轻代中Eden区与Survivor区的大小比值。设置为4，则两个Survivor区与一个Eden区的比值为2:4。
-XX:MaxTenuringThreshold=0： 设置垃圾最大年龄。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。

2）垃圾收集器相关
-XX:+UseParallelGC： 选择垃圾收集器为并行收集器。
-XX:ParallelGCThreads=20： 配置并行收集器的线程数
-XX:+UseConcMarkSweepGC： 设置年老代为并发收集。
-XX:CMSFullGCsBeforeCompaction：由于并发收集器不对内存空间进行压缩、整理，所以运行一段时间以后会产生“碎片”，使得运行效率降低。此值设置运行多少次GC以后对内存空间进行压缩、整理。
-XX:+UseCMSCompactAtFullCollection： 打开对年老代的压缩。可能会影响性能，但是可以消除碎片

3）辅助信息相关

-XX:+PrintGC
-XX:+PrintGCDetails
-XX:+PrintGC
-XX:+PrintGCDetails

3、强引用、软引用、弱引用、虚引用的区别？

参考https://www.cnblogs.com/wangsen/p/11206956.html

1）强引用

​	我们平时new了一个对象就是强引用，例如 

```java
Object obj=new Object();//这样定义就是一个强引用
Object obj2=obj;//也是一个强引用
obj=null;
System.gc();//不会被垃圾回收
```

​	只要还有强引用指向一个对象，就能表明对象还活着。即使在内存不足的情况下，JVM宁愿抛出OutOfMemory错误也不会回收这种对象。

> 因此，强引用是造成java内存泄露的主要原因之一。

2）软引用SoftReference

​	如果一个对象<font color=red>只</font>具有软引用，则内存空间足够，垃圾回收器就不会回收它；如果内存空间不足了，就会回收这些对象的内存。

​	用处： 软引用在实际中有重要的应用，例如浏览器的后退按钮。按后退时，这个后退时显示的网页内容是重新进行请求还是从缓存中取出呢？这就要看具体的实现策略了。（1）如果一个网页在浏览结束时就进行内容的回收，则按后退查看前面浏览过的页面时，需要重新构建；（2）如果将浏览过的网页存储到内存中会造成内存的大量浪费，甚至会造成内存溢出。

如下代码：

```java
Browser prev = new Browser();               // 获取页面进行浏览
SoftReference sr = new SoftReference(prev); // 浏览完毕后新增一个软引用指向它
prev = null;
if(sr.get()!=null){ 
    rev = (Browser) sr.get();           // 还没有被回收器回收，直接获取
}else{
    prev = new Browser();               // 由于内存吃紧，所以对软引用的对象回收了
    sr = new SoftReference(prev);       // 重新构建
}
```

3）弱引用WeakReference

​	具有弱引用的对象拥有更短暂的生命周期。在垃圾回收器线程扫描它所管辖的内存区域的过程中，一旦发现了<font color=red>只</font>具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。

```java
String str=new String("abc");    
WeakReference<String> abcWeakRef = new WeakReference<String>(str);
str=null;//等价于str = null; System.gc();
```

4）虚引用

​	顾名思义,就是形同虚设,与其他几种引用都不同,虚引用并不会决定对象的生命周期。如果一个对象<font color=red>只</font>持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收。
​	它不能单独使用，也不能通过它访问对象，虚引用必须和引用队列(Reference queue)联合使用。
​	（对象在被回收之前要被引用队列保存一下。GC之前对象不放在队列中，GC之后才对象放入队列中。）
​	虚引用主要用来跟踪对象被垃圾回收器回收的活动。仅仅是提供了一种确保对象被 finalize以后，做某些事情的机制。

```java
String str = new String("哈哈哈");
ReferenceQueue rq = new ReferenceQueue();
PhantomReference pr = new PhantomReference(str,rq);//它被回收之前，会被自动放入ReferenceQueue中
str = null;  
System.out.println(pr.get());//输出：null，并不能通过虚引用来获取被引用的对象
System.gc();
System.runFinalization();
//取出引用队列中最先进入队列的引用和pr比较
System.out.println(rq.poll() == pr);//输出：true
```



|      | GC回收时机       | 怎么创建                                                     | 能够通过该引用访问对象 | 适用场景                       |
| ---- | ---------------- | ------------------------------------------------------------ | ---------------------- | ------------------------------ |
| 强   | 不回收           | new出来的对象                                                | 能                     | 普遍存在                       |
| 软   | 内存不够了再回收 | SoftReference sr = new SoftReference(prev)                   | 能                     | 创建缓存                       |
| 弱   | 不管够不够都回收 | WeakReference<String> abcWeakRef = new WeakReference<String>(str); | 能                     | java.util.WeakHashMap中的key   |
| 虚   | 同上             | PhantomReference pr = new PhantomReference(str,rq);          | 不能                   | 跟踪对象被垃圾回收器回收的活动 |




# MySQL

## 关系型数据库理论

### 与NoSQL比较

|                | 一般基于什么模型 | 数据存储结构                                                 | 水平扩展             | 数据一致性 | 复杂查询         | 安全性 | 海量数据存储 |
| -------------- | ---------------- | ------------------------------------------------------------ | -------------------- | ---------- | ---------------- | ------ | ------------ |
| 关系型数据库   | ACID             | 一般都有固定的表结构（结构化存储）                           | 难                   | 强一致性   | 方便进行复杂查询 | 高     | 难以应对     |
| 非关系型数据库 | CAP              | 非关系型数据库的存储机制就有很多了，比如基于文档的（MongoDB）、K-V键值对的（Redis）、列存储的（Hbase）、还有基于图的等，对于数据的格式十分灵活没有固定的表结构 | 一般原生支持水平扩展 | 最终一致性 | 不方便           | 低     | 轻松处理     |

> 上表中提到的：
>
> （1）ACID模型：（即事务性）
>
> - 原子性（Atomicity）：原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。（比如转账过程中A向B转出200和B从A收到200这两个操作必须一起成功或者一起失败，不能只成功一个）
>
> - 一致性（Consistency）：事务前后数据的完整性必须保持一致（每次读取的都必须是最新数据）。
>
> - 隔离性（Isolation）：事务的隔离性是不同的事务并发操作相同的数据时，每个事务都有各自独立的数据空间，即一个事务内部的操作及使用的数据对其他并发事务是隔离的，并发执行的各个事务之间不能相互干扰。（隔离级别参见后续内容）
>
> - 持久性（Durability）：持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。即使发生系统崩溃或机器宕机等故障，只要数据库能够重新启动，那么一定能够将其恢复到事务成功结束的状态
>
> （2）CAP模型：
>
> ​	这三个指标不可能同时做到，最多选择实现其二。
>
> ​	参考https://www.cnblogs.com/owenma/p/8723551.html（其中介绍了BASE理论，它是对CAP中一致性和可用性权衡的结果）
>
> - 一致性（Consistent）: 在分布式环境下，一致性是指数据在多个副本之间能否保持一致的特性。
>
> - 可用性（Available）: 可用性是指系统提供的服务必须一直处于可用的状态，对于用户的每一个操作请求总是能够在有限的时间内返回结果。这里的重点是"有限时间内"和"返回结果"。
>
> - 分区容错性（Partition Tolerant）: 在两个复制系统之间，如果发生了计划之外的区间通信失败，应有一套容错性设计来保证。一般来说，分区容错无法避免，且对于一个分布式系统而言，分区容错性也是一个最基本的要求，因此可以认为 CAP 的 P 总是成立。CAP 定理告诉我们，剩下的 C 和 A 无法同时做到。
>
>   >一致性和可用性，为什么不可能同时成立？
>   >
>   >答案很简单，因为可能通信失败（即出现分区容错）。如果保证 G2分区 的一致性，那么 G1分区 必须在写操作时，锁定 G2 的读操作和写操作，只有数据同步后，才能重新开放读写，锁定期间，G2 不能读写，也就失去了可用性。如果保证 G2 的可用性，那么势必不能锁定 G2，所以一致性不成立。
>
> （3）扩展：一般我们把sharding（分片）机制分成水平扩展（即横向扩展、向外扩展）和垂直扩展两种方式。
>
> ​	（关系型数据库大多采用主备高可用方案，只能纵向扩展，无法很好地实现原生的分布式集群方案）
>
> - 水平扩展（scale out）：不改动数据库表结构，通过对表中数据的拆分而达到分片的目的（在数据库的设计中，我们更关注数据库的水平扩展的能力）
> - 垂直扩展（scale up）：将表和表分离，或者改动表结构，依照訪问的差异将某些列拆分出去
>
> （4）一致性：
>
> - 强一致性：要求系统写入什么，读出来的也会是什么
> - 弱一致性：系统在写入成功后，不承诺立即可以读到写入的值，也不久承诺多久之后数据能够达到一致，但会尽可能地保证到某个时间级别（比如秒级别）后，数据能够达到一致状态
> - 最终一致性：最终一致性是弱一致性的一个特例，系统会保证在一定时间内，能够达到一个数据一致的状态。这里之所以将最终一致性单独提出来，是因为它是弱一致性中非常推崇的一种一致性模型，也是业界在大型分布式系统的数据一致性上比较推崇的模型



### 数据库设计步骤

1、需求分析：通过与客户联系沟通等交流方式获取客户较为详细需求。利用获取到的需求，设计出系统大致功能的结构图。

2、概念设计：概念结构设计的目标是设计数据库的E-R模型图，确认需求信息的正确和完整。具体来说就是从需求分析中找到实体，确认实体的属性、确认实体的关系，画出E-R图。

> 一个标准的E-R模型主要由实体、属性和联系3部分组成。
>
> - 实体和属性：
>
>   ​	实体是一个数据对象，是指客观存在并可以相互区分的事物，如一个教师、一个学生、一个雇员等等。每个实体由一组属性来表示，如，一个具体的学生拥有学号、姓名、性别和班级等属性，其中学号可以唯一标识具体某个学生这个实体。具有相同属性的实体组合在一起就构成实体集—即实体集是实体的集合，而实体则是实体集中的某一个特例，例如，王大锤这个实体就是学生实体集中的一个特例。
>
> - 联系：
>
>   ​	在实际应用中，实体之间是存在联系的，这种联系必须在逻辑模型中表现出来。在E-R模型中，联系用菱形表示，菱形框内写明“联系名”，并用“连接线”将有关实体连接起来，同时在“连接线”的旁边标注上联系的类型，两个实体之间的联系类型可以分为3类：一对一、一对多和多对多

3、逻辑设计：利用E-R图得到关系模式。逻辑结构设计的任务是将概念结构设计阶段完成的实体模型转换成特定的数据库所支持的数据模型的过程。逻辑结构设计的目的是将E-R图中的实体、属性和联系转换成为关系模式（关系模式用二维表来组织数据，这个二维表在关系模式中称为关系，关系模式的逻辑结构是二维表）

4、（数据库）物理设计：通过关系模式最终设计得到目标关系型数据库

### 完整性约束

​	完整性约束用于维护数据的完整性或者满足业务约束的需求。实体完整性、参照完整性是关系模型必须满足的完整性约束条件，称为关系的两个不变性，应该由 RDBMS 支持。而用户定义的完整性，是应用领域需要遵循的约束条件，体现了具体领域中的语义约束 。

（1）实体完整性（主键约束）
	规则：主属性不为空。

> 即，若属性 A 是基本关系 R 的主属性，则属性 A 不能取空值。（空值就是 “不知道” 或 “不存在” 或 “无意义” 的值）

（2）参照完整性（外键约束）
	规则：参考关系的外码，要么对应被参考关系的主码，要么为空。

> 即，若属性（或属性组）F 是基本关系 R 的外码，它与基本关系 S 的主码 Ks 相对应（基本关系 R 和 S 不一定是不同的关系），则对于 R 中每个元组在 F 上的值必须为：或者取空值，或者等于 S 中某个元组的主码值。

（3）用户定义完整性（非空约束、唯一约束、检查约束和默认值）

​	用户定义完整性是针对某一具体关系数据库的约束条件，反映某一具体数据库应用程序所涉及的数据必须满足的语义要求。RDBMS（关系数据库管理系统） 应提供定义和检验这类完整性的机制，以便用统一的系统的方法处理它们，而不需由应用程序承担这一功能。

> 例如：课程（课程号，课程名，学分）
> 		“课程号” 属性必须取唯一值。
> 		非主属性 “课程名” 也不能取空值。
> 		“学分” 属性只能取值 {1，2，3，4}。

### 范式

​	关系型数据库为了避免储存冗余数据以及充分利用好存储空间，要求数据按照最小关系表的形式进行储存，根据合理的范式进行分表。
​	规范化是把数据库组织成在保持存储数据完整性的同时最小化冗余数据的结构的过程。规范化的数据库必须符合关系模型的范式法则。范式可以防止在使用数据库时出现不一致的数据，并防止数据丢失。关系范式有：1NF，2NF，3NF，4NF，5NF，6NF和BCNF范式等多种。要求是从低到高逐渐递增。关系型数据库必须满足1NF，通常满足到3NF就可以了。

参考https://www.cnblogs.com/aiqingqing/p/4398954.html

1、第一范式：确保每列的原子性。即每列(或者每个属性)都是不可再分的最小数据单元。

> 例如:顾客表(姓名、编号、地址、……)其中"地址"列还可以细分为国家、省、市、区等，这就不满足原子性。

2、第二范式：在第一范式的基础上更进一层,目标是确保表中的每列都和主键相关。
			如果一个关系满足第一范式,并且除了主键以外的其它列,都依赖于该主键,则满足第二范式。

> 例如:订单表(订单编号、产品编号、定购日期、价格、……)，"订单编号"为主键，"产品编号"和主键列没有直接的关系，即"产品编号"列不依赖于主键列，应删除该列。 

3、第三范式：在第二范式的基础上更进一层,目标是确保每列都和主键列直接相关,而不是间接相关。
			如果一个关系满足第二范式,并且除了主键以外的其它列都不依赖于主键列,则满足第三范式. 

> ​	为了理解第三范式，需要根据Armstrong公里之一定义传递依赖。假设A、B和C是关系R的三个属性，如果A-〉B且B-〉C，则从这些函数依赖中，可以得出A-〉C，如上所述，依赖A-〉C是传递依赖。 
> ​	例如:订单表(订单编号，定购日期，顾客编号，顾客姓名，……)，初看该表没有问题，满足第二范式，每列都和主键列"订单编号"相关，再细看你会发现"顾客姓名"和"顾客编号"相关，"顾客编号"和"订单编号"又相关，最后经过传递依赖，"顾客姓名"也和"订单编号"相关。为了满足第三范式，应去掉"顾客姓名"列，放入客户表中。



## CRUD

关系型数据库采用结构化查询语言（即 SQL）来对数据库进行查询，SQL 支持 CRUD（增加，查询，更新，删除）操作，还可以采用类似索引的方法来加快查询操作。

>- 数据查询操作：选择（Selection）、投影（Projection）、连接（Join）、并集（Union）、差集（Exception）、交集（Intersection）、笛卡尔积（Cartesian product）、除。其中，选择、投影、并、差、笛卡尔积是 5 种基本操作。
>
>- 数据更新操作：插入、删除、修改。

（1）选择运算（WHERE 根据条件过滤行）

​	选择运算又称为限制（Restriction）：在关系中选择满足给定条件的元组。

（2）投影（SELETE 显式选取列）

​	从关系 R 中选择出若干属性列组成新的关系 S。投影运算主要是从列的角度进行运算。投影之后不仅取消了原关系中的某些列，而且还可能取消某些元组（避免重复行）。

（3）连接运算（JOIN 多表级联）（关联查询）

​	从两个关系的笛卡尔积中选取属性间满足一定条件的元组。

> 连接的分类：
>
> ​	参考https://www.cnblogs.com/LUO77/p/5829692.html，里面有图示和示例，很好理解。
>
> 1、INNER JOIN（内连接,或等值连接）：产生同时符合A和B的一组数据
>
> ​	语句示例：
>
> ```sql
> mysql> select * from table1 inner join table2 on table1.id=table2.id;
> 或：
> mysql> select * from A, B where A.学号=B.学号
> ```
>
> ​	有等值连接也就有非等值连接，就是把等于号变成了不等号。
>
> 2、LEFT JOIN（左连接）：left join（或left outer join，在Mysql中两者等价，推荐使用left join）从左表A中产生一套完整的记录，并连接上相匹配的右表B ，如果没有匹配，右侧将包含null。
>
> ​	语句示例：
>
> ```sql
> mysql> select * from table1 left join table2 on table1.id=table2.id;
> ```
>
> 3、RIGHT JOIN（右连接）：与 LEFT JOIN 相反，取得右表（table2）完全记录，即使左表（table1）并无匹配对应记录。
>
> 4、CROSS JOIN（交叉连接）：得到的结果是两个表的乘积，即笛卡尔积。
>
> ​	语句示例：
>
> ```sql
> mysql> select * from table1 cross join table2;
> ```
>
> 5、FULL JOIN（全连接）：同时实现了左外和右外连接的效果。mysql不支持full join，可以用right join和left join模拟
>
> ​	语句示例：
>
> ```sql
> mysql> select * from exam left join recuit on exam.id=recuit.id
>  -> union
>  -> select * from exam right join recuit on exam.id = recuit.id;
> ```

（4）笛卡尔积

​	表示为 X × Y，假设集合 X={a, b}，集合 Y={0, 1, 2}，则两个集合的笛卡尔积为 {(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}。但是实际上X（m1行，n1列）或Y（m2行，n2列）都是一张二维表，所以笛卡尔积的结果是X的所有行和Y所有行的所有可能组合的结果，最终结果是一个m1×m2行，n1+n2列的新表。比如https://www.cnblogs.com/Toolo/p/3634563.html

## SQL语法

> SQL 对大小写不敏感。
>
> 用的时候到这里查：https://www.runoob.com/w3cnote/sql-syntax-manual.html

USE - 选择数据库
SELECT - 从数据库中提取数据
UPDATE - 更新数据库中的数据
DELETE - 从数据库中删除数据
INSERT INTO - 向数据库中插入新数据
CREATE DATABASE - 创建新数据库
ALTER DATABASE - 修改数据库
CREATE TABLE - 创建新表
ALTER TABLE - 变更（改变）数据库表
DROP TABLE - 删除表
CREATE INDEX - 创建索引（搜索键）
DROP INDEX - 删除索引

## 索引

### 索引是什么

​	索引是一种特殊的查询表，可以被数据库搜索引擎用来加速数据的检索。
​	简单说来，索引就是指向表中数据的指针。
​	数据库的索引同书籍后面的索引非常相像。

### 索引的类型

1、详细分类（可以认为是逻辑上的分类）：

- 主键索引: 数据列不允许重复，不允许为NULL，一个表只能有一个主键。
- 唯一索引: 数据列不允许重复，允许为NULL值，一个表允许多个列创建唯一索引（组合索引充当唯一索引），如果是组合索引，则列值的组合必须唯一。
- 普通索引: 基本的索引类型，没有限制（没有唯一性的限制，允许为NULL值）
- 组合索引：多列值组成一个索引，用于组合搜索，效率大于索引合并
- 覆盖索引：指从辅助索引中就能获取到需要的记录，而不需要回表。就像你拿到了一本书的目录，里头有标题和对应的页码，当你想知道第267页的标题是什么的时候，完全没有必要翻到267页去看，而是直接看目录。同理，当你要select的字段，已经在索引树里面存储，那就不需要再去检索数据库，直接拿来用就行了。常用的覆盖索引的实现手段是--通过建立组合索引覆盖被查询的字段（参考https://blog.csdn.net/lida776537387/article/details/105377731）
- 全文索引：是目前搜索引擎使用的一种关键技术，对文本的内容进行分词、搜索

> 关于MySQL全文索引：参考https://blog.csdn.net/mrzhouxiaofei/article/details/79940958
>
> （1）它是基于相似度的查询，而不是精确查询。比如搜索引擎，虽然搜索引擎的索引对象是超大量的数据，并且通常其背后都不是关系型数据库，不过全文索引的基本原理是一样的。
>
> （2）虽然like+%可以实现模糊匹配，但like+%只在文本比较少时合适。全文索引在大量的数据面前，能比like+%快N倍，速度不是一个数量级。
>
> （3）只有字段的数据类型为 char、varchar、text 及其系列才可以建全文索引。
>
> （4）使用全文索引：
>
> ​	和常用的模糊匹配使用 like + % 不同，全文索引有自己的语法格式，使用 match 和 against 关键字，比如
>
> ```sql
> select * from fulltext_test where match(content,tag) against('xxx xxx');
> ```
>
> > 注意： match() 函数中指定的列必须和全文索引中指定的列完全相同，否则就会报错，无法使用全文索引，这是因为全文索引不会记录关键字来自哪一列。如果想要对某一列使用全文索引，请单独为该列创建全文索引。

2、聚集索引与非聚集索引（物理上的分类）

（1）聚集索引（聚簇索引）：

- 聚集索引的索引中键值的逻辑顺序决定了表中相应行的物理顺序，也就是说聚集索引的顺序就是数据的物理存储顺序
- 一个表中只能拥有一个聚集索引，因为数据在物理存放时只能有一种排列方式
- 拿mysql来说，聚集索引通常是表的主键，若无主键则为表中第一个非空的唯一索引，还是没有就采用innodb存储引擎为每行数据内置的ROWID作为聚集索引
- 在 InnoDB 里，主键索引也被称为聚集索引，InnoDB必须要有至少一个聚簇索引
- 每个InnoDB表都有一个称为聚集索引的特殊索引，其中存储了行的数据。通常，聚集索引与主键同义，在表上定义PRIMARY KEY时，InnoDB将其用作聚集索引

（2）非聚集索引（辅助索引、二级索引、普通索引、非聚簇索引、除聚簇索引外的索引）：

- 非聚集索引的索引中，索引的逻辑顺序与磁盘上行的物理存储顺序不同
- 一个表可以存在多个非聚集索引
- InnoDB的普通索引叶子节点存储的是主键（聚簇索引）的值，而MyISAM的普通索引存储的是记录指针

>基于主键索引和普通索引（辅助索引/二级索引）的查询有什么区别：
>
>​	主键索引的叶子节点存的是整行数据。在 InnoDB 里，主键索引也被称为聚集索引（clustered index）。
>
>​	非主键索引的叶子节点内容是主键的值。在 InnoDB 里，非主键索引也被称为二级索引（secondary index）。
>
>​	如果语句是 select * from T where ID=500，即 主键查询方式，则只需要搜索 ID 这棵 B+树 ；
>
>​	如果语句是 select * from T where k=5，即 普通索引查询方式，则需要先搜索 k 索引树，得到 ID的值为 500，再到 ID 索引树搜索一次。这个过程称为<font color=red>回表</font>。（辅助索引的叶子节点保存的是主键值或者记录指针）

### 最左前缀规则

最左前缀原则使用在组合索引中。

比如索引“index1:(a,b,c)”，相当于创建了（a）索引、（a,b）索引、（a,b,c）索引，检索的时候只会走a、a,b、a,b,c 三种类型的查询，其实这里说的有一点问题，a,c也走，但是只走a字段索引，不会走c字段。

### 索引的优缺点

（1）优点：

- 可以通过建立唯一索引或者主键索引,保证数据库表中每一行数据的唯一性
- 索引可以加快数据查询速度，减少查询时间

（2）缺点：

- 创建索引和维护索引要耗费时间
- 索引需要占物理空间，除了数据表占用数据空间之外，每一个索引还要占用一定的物理空间
- 以表中的数据进行增、删、改的时候，索引也要动态的维护

### 索引的创建方式：三种

（1）在执行CREATE TABLE时创建索引

（2）使用ALTER TABLE命令添加索引

```sql
ALTER TABLE table_name ADD INDEX index_name (column);
```

（3）使用CREATE INDEX命令创建

```sql
CREATE INDEX index_name ON table_name (column);
```

### 索引为什么要用 B+树实现

​	B+树索引的所有数据均存储在叶子节点，而且数据是按照顺序排列的，链表连着的。那么B+树使得范围查找，排序查找，分组查找以及去重查找变得异常简单。
（1）为什么不是二叉树：范围查找效率低，二叉树每个节点只存储一个数据，如果是B/B+树，可以存储更多的节点数据。

（2）为什么不是B树：B+树非叶子节点上是不存储数据的，仅存储键值，而B树节点中不仅存储键值，也会存储数据。InnoDB中页的默认大小是16KB，如果不存储数据，那么就会存储更多的键值，相应的树的阶数（节点的子节点树）就会更大，树就会更矮更胖，如此一来我们查找数据进行磁盘的IO次数有会减少，数据查询的效率也会更快。

> 关于索引及其B+树实现的讲解，以及两种引擎的索引实现，这里讲的很通俗易懂：https://mp.weixin.qq.com/s/P97QDQ0qkpI5RGzLGpvKBg

## 存储引擎

​	数据库存储引擎是数据库底层软件组织，数据库管理系统（DBMS）使用数据引擎进行创建、查询、更新和删除数据。不同的存储引擎提供不同的存储机制、索引技巧、锁定水平等功能，使用不同的存储引擎，还可以获得特定的功能。现在许多不同的数据库管理系统都支持多种不同的数据引擎。

​	常用的是MyISAM和InnoDB。 

### 区别

|        | 支持事务 | 支持外键 | 支持全文索引                       | 锁粒度           | 主要优点           | 主要应用场景               |
| ------ | -------- | -------- | ---------------------------------- | ---------------- | ------------------ | -------------------------- |
| MyISAM | ×        | ×        | √                                  | 表               | 插入、查询速度快   | Web、数据仓储              |
| InnoDB | √        | √        | ×（5.7以后的InnoDB支持全文索引了） | 行（支持行级锁） | 海量数据操作性能好 | 事务型数据库、大容量数据集 |

> 补充：
>
> （1）InnoDB支持事务，对于InnoDB每一条SQL语言都默认封装成事务，自动提交，这样会影响速度，所以最好把多条SQL语言放在begin和commit之间，组成一个事务。
>
> （2）InnoDB是聚集索引，使用B+Tree作为索引结构，数据文件是和（主键）索引绑在一起的（表数据文件本身就是按B+Tree组织的一个索引结构），必须要有主键，通过主键索引效率很高。但是辅助索引需要两次查询，先查询到主键，然后再通过主键查询到数据。
>
> MyISAM是非聚集索引，也是使用B+Tree作为索引结构，但索引和数据文件是分离的，索引保存的是数据文件的指针。主键索引和辅助索引是独立的。
>
> 也就是说：<font color=grenn>InnoDB的B+树主键索引的叶子节点就是真实的数据文件，辅助索引的叶子节点是主键的值；而MyISAM的B+树主键索引和辅助索引的叶子节点都是数据文件的地址指针</font>。（之所以这样设计，一个原因就是：如果和MyISAM一样在主键索引和辅助索引的叶子节点中都存放数据行指针，一旦数据发生迁移，则需要去重新组织维护所有的索引。）
>
> <img src="https://gitee.com/senbird/typora_pic/raw/master/pic/640" alt="图片" style="zoom:67%;" />
>
> （3）InnoDB表必须有唯一索引（如主键）（用户没有指定的话会自己找/生产一个隐藏列Row_id来充当默认主键），而MyISAM可以没有。

### 如何选择

​	是否要支持事务，如果要请选择innodb，如果不需要可以考虑MyISAM；
​	如果表中绝大多数都只是读查询，可以考虑MyISAM，如果既有读也有写，请使用InnoDB；
​	系统奔溃后，MyISAM恢复起来更困难，能否接受；
​	MySQL5.5版本开始Innodb已经成为Mysql的默认引擎(之前是MyISAM)，说明其优势是有目共睹的，如果你不知道用什么，那就用InnoDB，至少不会差。

### 其他问题

1、InnoDB为什么推荐使用自增ID作为主键？

  答：自增ID可以保证每次插入时B+索引是从右边扩展的，可以避免B+树和频繁合并和分裂（对比使用UUID）。如果使用字符串主键和随机主键，会使得数据随机插入，效率比较差。

## 隔离级别与脏读

### 数据库并发场景

- `读-读`：不存在任何问题，也不需要并发控制
- `读-写`：有线程安全问题，可能会造成事务隔离性问题，可能遇到脏读，幻读，不可重复读
- `写-写`：有线程安全问题，可能会存在更新丢失问题，比如第一类更新丢失，第二类更新丢失

### 隔离级别

参考https://blog.csdn.net/lxw1844912514/article/details/109140620

上面提到了ACID，其中I就是隔离性，MySQL 里有四个隔离级别：

- Read uncommttied（可以读取未提交数据）
- Read committed（可以读取已提交数据）
- Repeatable read（可重复读，Mysql的默认级别）
- Serializable（可串行化）

隔离级别越高，越能保证数据的完整性和一致性，但是对并发性能的影响也越大。隔离级别越高，InnoDB 给记录集加的锁就越严格（尤其是使用范围条件的时候），产生锁冲突的可能性也就越高，从而对并发性事务处理性能的 影响也就越大。因此， 我们在应用中， 应该尽量使用较低的隔离级别， 以减少锁争用的机率。实际上，通过优化事务逻辑，大部分应用使用 Read Commited 隔离级别就足够了。

> 在 InnoDB 中，默认为 Repeatable 级别，InnoDB 中使用一种被称为 next-key locking （间隙锁）的策略来避免幻读（phantom）现象的产生。

不同的事务隔离级别会导致不同的问题：

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X2pwZy9vRkE0UU9lRUVwTjhVNTg2ZU1EUFJsd2t3STFpYWliSmZ0aWFYaWNDWHVyVU1hc0gzWTZIb0huejkySDBKeDN0YjhaWFBwUmtieWljM01iekNDdGJvQVk0SG1nLzY0MA" alt="img" style="zoom:80%;" />



> 下面内容参考https://zhuanlan.zhihu.com/p/150107974

### 脏读

​	脏读是指一个事务中访问到了另外一个事务未提交的数据。（注意，更新操作之后会有一个提交操作来确认更新）

> ​	脏写就是两个事务没提交的状况下，都修改同一条数据，结果一个事务回滚了，把另外一个事务修改的值也覆盖了，所谓脏写就是两个事务没提交状态下修改同一个值。
>
> ​	脏读就是一个事务修改了一条数据的值，结果还没提交呢，另外一个事务就读到了你修改的值，然后你回滚了，人家事务再次读，就读不到了，即人家事务读到了你修改之后还没提交的值，这就是脏读了。
>
> ​	无论是脏写还是脏读，都是因为一个事务去更新或者查询了另外一个还没提交的事务更新过的数据。因为另外一个事务还没提交，所以它随时可能会回滚，那么必然导致你更新的数据就没了，或者你之前查询到的数据就没了，这就是脏写和脏读两种场景。

### 不可重复读

​	不可重复读，指你事务内（提交前）多次查询，多次读到的是别的事务已经提交的事务修改过的值，这就导致你事务内读到的是多个不一样的值。

> 可重复读是事务期间，别的业务不会修改你操作的数据（所以可以重复读，因为每次读的都一样，那你旧随便读呗）；
>
> 不可重复读是事务期间，别的业务可能会修改你操作的数据（所以不可以重复度，因为多次读，读到的不一样，就会出问题）；
>
> 
>
> 其实，不可重复读这个问题你说是问题也不一定就是什么大问题。因为这取决于你自己想要数据库是什么样子的，如果你希望看到的场景是不可重复读，而数据库表现的也是不可重复读，那数据库就没什么问题，但如果你希望看到的和数据库表现的不一样，那你可以认为数据库是有问题的。
>
> 
>
> 隔离级别中“可重复读”通过“共享读锁”和“排他写锁”实现。读取数据的事务将会禁止写事务（但允许读事务），写事务则禁止任何其他事务。

### 幻读

​	相同的事务读取2次，得到的记录条数不一致。
​	事务A查询一个范围的结果集，另一个并发事务B往这个范围中插入/删除了数据，并静悄悄地提交，然后事务A再次查询相同的范围，两次读取得到的结果集不一样了，这就是幻读。

> ​	幻读是由事务不是独立执行而引起的。
>
> ​	隔离级别中“可重复读”保证了你在事务未提交前，别人不会修改你读的数据，所以此时不会发生“不可重复读”问题，但是可能会发生“幻读”问题，因为你虽然事务内读到的都是一样的，但是你如果发起两条事务，而在两条事务之间别人更新并提交了，你读到的就是两个不一样的结果。
>
> ​	要防止“幻读”，就要采用序列化（Serializable）隔离手段，此时事务只能一个接着一个地执行，不能并发执行。仅仅通过“行级锁”是无法实现事务序列化的，必须通过其他机制保证新插入的数据不会被刚执行查询操作的事务访问到。
>
> ​	InnoDB中使用“间隙锁”来解决幻读问题，简单来说就是锁定符合检索条件的范围的索引，包括那些不存在的记录，这样就可以阻塞符合条件范围内键值的并发插入，详情可参考下面的“锁”章节中的“InnoDB锁机制”。

## 锁

参考https://zhuanlan.zhihu.com/p/29150809

### 共享锁和排他锁

> 按兼容性划分

- 共享锁（读锁）：其他事务可以读，但不能写。
- 排他锁（写锁） ：其他事务不能读取，也不能写。

### 表级锁和行级锁

> 按锁粒度划分

MySQL 不同的存储引擎支持不同的锁机制，所有的存储引擎都以自己的方式显现了锁机制，服务器层完全不了解存储引擎中的锁实现：

- MyISAM 和 MEMORY 存储引擎采用的是表级锁（table-level locking）
- BDB 存储引擎采用的是页面锁（page-level locking），但也支持表级锁
- InnoDB 存储引擎既支持行级锁（row-level locking），也支持表级锁，但默认情况下是采用行级锁。

> 默认情况下，表锁和行锁都是自动获得的， 不需要额外的命令。
> 但是在有的情况下， 用户需要明确地进行锁表或者进行事务的控制， 以便确保整个事务的完整性，这样就需要使用事务控制和锁定语句来完成。

|        | InnoDB       | MyISAM | 开销 | 锁定粒度 | 死锁       | 锁冲突概率 | 并发度 |
| ------ | ------------ | ------ | ---- | -------- | ---------- | ---------- | ------ |
| 表级锁 | 支持         | 支持   | 小   | 大       | 不会出现   | 高         | 低     |
| 行级锁 | 支持（默认） | 不支持 | 大   | 小       | 可能会出现 | 低         | 高     |

> 补充：
>
> 1、实现表级锁的存储引擎通过总是一次性同时获取所有需要的锁以及总是按相同的顺序获取表锁来避免死锁。
>
> 2、表级锁更适合于以查询为主，并发用户少，只有少量按索引条件更新数据的应用，如Web 应用；
>
> 行级锁更适合于有大量按索引条件并发更新少量不同数据，同时又有并发查询的应用，如一些在线事务处理（OLTP）系统。
>
> 3、页面锁：开销和加锁时间界于表锁和行锁之间；会出现死锁；锁定粒度界于表锁和行锁之间，并发度一般。

> 死锁相关知识：https://blog.csdn.net/hd12370/article/details/82814348
>
> 死锁产生的4个必要条件：1）互斥条件、2）请求并保持条件、3）不可剥夺条件、4）循环等待条件；
>
> 死锁预防：破坏上述四个条件之一即可。比如资源有序分配法就是破坏了条件4；
>
> 死锁避免：银行家算法（系统在进行资源分配之前预先计算资源分配的安全性）；
>
> 死锁检测与解除：检测到死锁后，采取剥夺资源、撤销进程等手段解除死锁。

### MyISAM锁机制

1、MyISAM表级锁模式：

​	MyISAM 表的读操作与写操作之间，以及写操作之间是串行的。当一个线程获得对一个表的写锁后， 只有持有锁的线程可以对表进行更新操作。 其他线程的读、 写操作都会等待，直到锁被释放为止。
​	默认情况下，写锁比读锁具有更高的优先级：当一个锁释放时，这个锁会优先给写锁队列中等候的获取锁请求，然后再给读锁队列中等候的获取锁请求。

> 这也正是 MyISAM 表不太适合于有大量更新操作和查询操作应用的原因，因为，大量的更新操作会造成查询操作很难获得读锁，从而可能永远阻塞。

2、MyISAM加表锁方法：

​	MyISAM 在执行查询语句（SELECT）前，会自动给涉及的表加读锁，在执行更新操作（UPDATE、DELETE、INSERT 等）前，会自动给涉及的表加写锁，这个过程并不需要用户干预，因此，用户一般不需要直接用 LOCK TABLE 命令给 MyISAM 表显式加锁。
​	在自动加锁的情况下，MyISAM 总是一次获得 SQL 语句所需要的全部锁，这也正是 MyISAM 表不会出现死锁（Deadlock Free）的原因。

3、MyISAM存储引擎支持并发插入，以减少给定表的读和写操作之间的争用：

​	如果MyISAM表在数据文件中间没有空闲块，则行始终插入数据文件的末尾。 在这种情况下，你可以自由混合并发使用MyISAM表的INSERT和SELECT语句而不需要加锁——你可以在其他线程进行读操作的时候，同时将行插入到MyISAM表中。 文件中间的空闲块可能是从表格中间删除或更新的行而产生的。 如果文件中间有空闲快，则并发插入会被禁用，但是当所有空闲块都填充有新数据时，它又会自动重新启用。 

### InnoDB锁机制

1、InnoDB 实现了以下两种类型的**行锁**：

- 共享锁（S）：允许一个事务去读一行，阻止其他事务获得相同数据集的排他锁。
- 排他锁（X）：允许获得排他锁的事务更新数据，阻止其他事务取得相同数据集的共享读锁和排他写锁。

2、为了允许行锁和表锁共存，实现多粒度锁机制，InnoDB 还有两种内部使用的意向锁（Intention Locks），这两种意向锁都是**表锁**：

- 意向共享锁（IS）：事务打算给数据行加行共享锁，事务在给一个数据行加共享锁前必须先取得该表的 IS 锁。

- 意向排他锁（IX）：事务打算给数据行加行排他锁，事务在给一个数据行加排他锁前必须先取得该表的 IX 锁。

  > 意向锁是 InnoDB 自动加的， 不需用户干预。对于 UPDATE、 DELETE 和 INSERT 语句， InnoDB会自动给涉及数据集加排他锁（X)；对于普通 SELECT 语句，InnoDB 不会加任何锁。

3、InnoDB 行锁实现方式：

- InnoDB 行锁是通过给索引上的索引项加锁来实现的，这一点 MySQL 与 Oracle 不同，后者是通过在数据块中对相应数据行加锁来实现的。InnoDB 这种行锁实现特点意味着：<font color=red>只有通过索引条件检索数据，InnoDB 才使用行级锁，否则，InnoDB 将使用表锁！</font>
- 不论是使用主键索引、唯一索引或普通索引，InnoDB 都会使用行锁来对数据加锁。
- 只有执行计划真正使用了索引，才能使用行锁：即便在条件中使用了索引字段，但是否使用索引来检索数据是由 MySQL 通过判断不同执行计划的代价来决定的，如果 MySQL 认为全表扫描效率更高，比如对一些很小的表，它就不会使用索引，这种情况下 InnoDB 将使用表锁，而不是行锁。

4、InnoDB的间隙锁：

​	当我们用范围条件而不是相等条件检索数据，并请求共享或排他锁时，InnoDB会给符合条件的已有数据记录的索引项加锁；对于键值在条件范围内但并不存在的记录，叫做“间隙（GAP)”，InnoDB也会对这个“间隙”加锁，这种锁机制就是所谓的间隙锁（Next-Key锁）。

​	很显然，在使用范围条件检索并锁定记录时，InnoDB这种加锁机制会阻塞符合条件范围内键值的并发插入，这往往会造成严重的锁等待。因此，在实际应用开发中，尤其是并发插入比较多的应用，我们要尽量优化业务逻辑，尽量使用相等条件来访问更新数据，避免使用范围条件。

> InnoDB使用间隙锁的目的：防止幻读，以满足相关隔离级别的要求；满足恢复和复制的需要。

### 乐观锁和悲观锁

> 按加锁机制划分

- 乐观锁(Optimistic Lock)：假设不会发生并发冲突，只在提交操作时检查是否违反数据完整性。 乐观锁不能解决脏读的问题。悲观锁思想就是，当前线程要进来修改数据时，别的线程都得拒之门外。

> ​	乐观锁, 顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。
>
> ​	乐观锁适用于多读的应用类型，这样可以提高吞吐量，像数据库如果提供类似于write_condition机制的其实都是提供的乐观锁。
>
> ​	实现方式：乐观锁一般会使用版本号机制或CAS算法实现。

- 悲观锁(Pessimistic Lock)：假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作。乐观锁思想就是，有线程过来，先放过去修改，如果看到别的线程没修改过，就可以修改成功，如果别的线程修改过，就修改失败或者重试。

> ​	悲观锁，顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。
>
> ​	select查询语句是不会加锁的，但是select for update除了有查询的作用外，还会加锁，而且它是悲观锁。至于加了是行锁还是表锁，这就要看是不是用了索引/主键，没用索引/主键的话就是表锁，否则就是是行锁。

## 分库与分表

数据量大的话，我们会先考虑进行垂直拆分，根据业务拆分，把大表拆分成小表，单表容量超过500万进行水平拆分，再大就进行分库，再大就分区。

### 分库分表方案:

- 水平分库：以字段为依据，按照一定策略（hash、range等），将一个库中的数据拆分到多个库中。
- 水平分表：以字段为依据，按照一定策略（hash、range等），将一个表中的数据拆分到多个表中。
- 垂直分库：以表为依据，按照业务归属不同，将不同的表拆分到不同的库中。
- 垂直分表：以字段为依据，按照字段的活跃性，将表中字段拆到不同的表（主表和扩展表）中。

### 常用的分库分表中间件：

- sharding-jdbc（当当）

- Mycat

- TDDL（淘宝）

- Oceanus(58同城数据库中间件)

- vitess（谷歌开发的数据库中间件）

- Atlas(Qihoo 360)

  > sharding-jdbc目前是基于jdbc驱动，无需额外的proxy，因此也无需关注proxy本身的高可用。 
  >
  > Mycat 是基于 Proxy，它复写了 MySQL 协议，将 Mycat Server 伪装成一个 MySQL 数据库，而 Sharding-JDBC 是基于 JDBC 接口的扩展，是以 jar 包的形式提供轻量级服务的。

### 分库分表可能遇到的问题

- 事务问题：需要用分布式事务
- 跨节点Join的问题：解决这一问题可以分两次查询实现
- 跨节点的count,order by,group by以及聚合函数问题：分别在各个节点上得到结果后在应用程序端进行合并。
- 数据迁移，容量规划，扩容等问题
- ID问题：数据库被切分后，不能再依赖数据库自身的主键生成机制啦，最简单可以考虑UUID
- 跨分片的排序分页问题（后台加大pagesize处理？）

## 主从复制&读写分离

参考https://www.cnblogs.com/kylinlin/p/5258719.html

​	主从复制（主从同步）：主数据库有写操作，从数据库自动同步。从数据库通过I/O线程去请求主数据库的binlog日志文件（二进制日志，包含SQL的增删改查等，用来做备份恢复等），并写到中继日志中，SQL线程会读取中继日志，并解析成具体操作同步数据到从数据库。

### 主从复制的作用

​	1、主数据库出现问题，可以切换到从数据库。

​	2、可以进行数据库层面的读写分离。

​	3、可以在从数据库上进行日常备份。

### 读写分离

读写分离分为：

- 数据库层面：主数据库负责写，从数据库负责读。
- 软件（代码）层面：通过读写分离中间间，比如MyCat、shardingsphere等实现。

读写分离的必要性：
	数据库写入效率要低于读取效率，一般系统中数据读取频率高于写入频率，单个数据库实例在写入的时候会影响读取性能，这是做读写分离的原因。

### 主从复制的原理

​	Mysql服务器之间的主从同步是基于二进制日志机制，主服务器使用二进制日志来记录数据库的变动情况，从服务器通过读取和执行该日志文件来保持和主服务器的数据一致。
​	在使用二进制日志时，主服务器的所有操作都会被记录下来，然后从服务器会接收到该日志的一个副本。从服务器可以指定执行该日志中的哪一类事件（譬如只插入数据或者只更新数据），默认会执行日志中的所有语句。
​	每一个从服务器会记录关于二进制日志的信息：文件名和已经处理过的语句，这样意味着不同的从服务器可以分别执行同一个二进制日志的不同部分，并且从服务器可以随时连接或者中断和服务器的连接。
​	主服务器和每一个从服务器都必须配置一个唯一的ID号（在my.cnf文件的[mysqld]模块下有一个server-id配置项），另外，每一个从服务器还需要通过CHANGE MASTER TO语句来配置它要连接的主服务器的ip地址，日志文件名称和该日志里面的位置（这些信息存储在主服务器的数据库里）

### 主从复制的方法

1、SBR（复制SQL语句）

​	Statement Based Replication，当使用二进制日志时，主服务器会把SQL语句写入到日志中，然后从服务器会执行该日志，这就是SBR，在mysql5.1.4之前的版本都只能使用这种格式。使用SBR会有如下长处：

- 日志文件更小；
- 记录了所有的语句，可以用来日后审计

弊端：

- 使用如下函数的语句不能被正确地复制：load_file(); uuid(), uuid_short(); user(); found_rows(); sysdate(); get_lock(); is_free_lock(); is_used_lock(); master_pos_wait(); rand(); release_lock(); sleep(); version();
- 在日志中出现如下警告信息的不能正确地复制：[Warning] Statement is not safe to log in statement format；
- Insert … select语句会执行大量的行级锁表；
- Update语句会执行大量的行级锁表来扫描整个表；

2、RBR（复制数据）

​	Row Based Replication，主服务器把表的行变化作为事件写入到二进制日志中，主服务器把代表了行变化的事件复制到从服务中，使用RBR的长处：

- 所有的数据变化都是被复制，这是最安全的复制方式
- 更少的行级锁表

弊端：

- 日志会很大
- 不能通过查看日志来审计执行过的sql语句，不过可以通过使用mysqlbinlog

3.MBR

​	既使用SBR也使用RBR，默认使用SBR。

|      | 复制什么 | 日志文件大小 | 审计已执行过的SQL语句 | 行级锁表和扫描表（执行性能） | 安全性 |
| ---- | -------- | ------------ | --------------------- | ---------------------------- | ------ |
| SRB  | SQL语句  | 很小         | 支持                  | 大量                         |        |
| PRB  | 数据     | 很大         | 不支持                | 很少                         | 最安全 |







## MVCC

参考https://blog.csdn.net/SnailMann/article/details/94724197

​	Multi-Version Concurrency Control ，即多版本<font color=red>并发</font>控制。MVCC 是一种并发控制的方法，一般在数据库管理系统中，实现对数据库的并发访问，在编程语言中实现事务内存。

> MVCC在 **MySQL InnoDB** 中的实现主要是为了提高数据库并发性能，用更好的方式去<font color=red>处理读写冲突</font>，做到即使有读写冲突时，也能做到<font color=red>不加锁</font>，非阻塞并发读。

### 当前读和快照读

- 当前读（加锁）
  像 select lock in share mode (共享锁), select for update; update; insert; delete (排他锁)这些操作都是一种当前读，为什么叫当前读？就是它<font color=green>读取的是记录的最新版本</font>，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁

- 快照读（不加锁）
  像不加锁的 select 操作就是快照读，即不加锁的非阻塞读；快照读的前提是隔离级别不是串行级别，串行级别下的快照读会退化成当前读；之所以出现快照读的情况，是基于提高并发性能的考虑，快照读的实现是基于多版本并发控制，即 MVCC ,可以认为 MVCC 是行锁的一个变种，但它在很多情况下，避免了加锁操作，降低了开销；既然是基于多版本，即<font color=green>快照读可能读到的并不一定是数据的最新版本，而有可能是之前的历史版本</font>。

  > 前面提到过，select操作在MyISAM中会自动加读锁，在InnoDB中不会自动加锁。

> ​	说白了 MVCC 就是为了实现读-写冲突不加锁，而这个读指的就是`快照读`, 而非当前读，当前读实际上是一种加锁的操作，是悲观锁的实现。
>
> ​	MVCC 多版本并发控制是 「维持一个数据的多个版本，使得读写操作没有冲突」 的概念，只是一个抽象概念，并非实现。因为 MVCC 只是一个抽象概念，要实现这么一个概念，MySQL 就需要提供具体的功能去实现它，「快照读就是 MySQL 实现 MVCC 理想模型的其中一个非阻塞读功能」。而相对而言，当前读就是悲观锁的具体功能实现。

### MVCC的优点

​	多版本并发控制（MVCC）是一种用来解决读-写冲突的无锁并发控制，也就是为事务分配单向增长的时间戳，为每个修改保存一个版本，版本与事务时间戳关联，读操作只读该事务开始前的数据库的快照。 所以 MVCC 可以为数据库解决以下问题：

- 在并发读写数据库时，可以做到在读操作时不用阻塞写操作，写操作也不用阻塞读操作，提高了数据库并发读写的性能
- 同时还可以解决脏读，幻读，不可重复读等事务隔离问题，但不能解决更新丢失问题

> 简而言之，MVCC 就是因为大佬们，不满意只让数据库采用悲观锁这样性能不佳的形式去解决读-写冲突问题，而提出的解决方案，所以在数据库中，因为有了 MVCC，所以我们可以形成两个组合：
>
> - MVCC + 悲观锁：MVCC解决读写冲突，悲观锁解决写写冲突
> - MVCC + 乐观锁：MVCC解决读写冲突，乐观锁解决写写冲突
>
> 这种组合的方式就可以最大程度的提高数据库并发性能，并解决读写冲突，和写写冲突导致的问题

### MVCC 的实现原理

​	MVCC 的目的就是多版本并发控制，在数据库中的实现，就是为了解决读写冲突，它的实现原理主要是依赖记录中的 3个隐式字段，undo日志 ，Read View 来实现的。

（1）隐式字段：每行记录除了我们自定义的字段外，还有数据库隐式定义的 DB_TRX_ID, DB_ROLL_PTR, DB_ROW_ID 等字段

- DB_TRX_ID：6 byte，最近修改(修改/插入)事务 ID：也就是说，这条数据就是由这个事务ID修改之后产生的
- DB_ROLL_PTR：7 byte，回滚指针，用于配合 undo日志，指向这条记录的上一个版本（形成一个链表）
- DB_ROW_ID：6 byte，隐含的自增 ID（隐藏主键），如果数据表没有主键，InnoDB 会自动以DB_ROW_ID产生一个聚簇索引

> 实际还有一个删除 flag 隐藏字段, 既记录被更新或删除并不代表真的删除，而是删除 flag 变了

（2）undo日志：undo log 主要分为两种：

- insert undo log：代表事务在 insert 新记录时产生的 undo log, 只在事务回滚时需要，并且在事务提交后可以被立即丢弃
- update undo log：事务在进行 update 或 delete 时产生的 undo log ; 不仅在事务回滚时需要，在快照读时也需要；所以不能随便删除，只有在快速读或事务回滚不涉及该日志时，对应的日志才会被 purge 线程统一清除

（3）Read View 读视图

​	Read View 主要是用来做可见性判断的, 即当我们某个事务执行快照读的时候，对该记录创建一个 Read View 读视图，把它作为条件来判断当前事务能够看到哪个版本的数据，然后快照读就去读这个版本的数据。

> 你在快照读的时候，可能别的事务正在写，同时可能有的事务已经修改完，所以你要在这个复杂的环境中判断你要快照读的时候，读哪个历史版本或者最新数据是合适的，因为你不能读别人正在改但尚未提交的数据，也不能读太旧的数据。

​	可以把 Read View 简单的理解成有三个全局属性：
​	（1）Read View 生成时刻系统 正活跃的事务 ID 的列表；（越新的事务，ID值越大）
​	（2）上述列表中事务 ID 最小的 ID；
​	（3）ReadView 生成时刻系统尚未分配的下一个事务 ID ，也就是 目前已出现过的事务 ID 的最大值 + 1；

（4）所以整个可见性判断过程大致就是：
	1）先取最新的DB_TRX_ID来跟上述Read View的三个全局属性比较：
		Ⅰ：DB_TRX_ID < “活跃列表中最小的ID” 的话，则满足可见性，否则进入下一阶段比较；
		Ⅱ：DB_TRX_ID ≥ “ReadView 生成时刻系统尚未分配的下一个事务 ID” 的话，说明DB_TRX_ID 所在的记录在 Read View 生成后才出现的，那就不满足可见性条件，如果小于，就进入下一阶段比较；
		Ⅲ：判断 DB_TRX_ID 是否在活跃列表之中，如果在，说明我 Read View 生成时刻，你这个事务还在活跃，还没有 Commit，你修改的数据，我当前事务也是看不见的；如果不在，则说明，你这个事务在 Read View 生成之前就已经 Commit 了，你修改的结果，我当前事务是能看见的。
	2）如果上述比较通过了，即满足可见性，那快照读就读该事务ID对应的版本的数据；
	3）如果不满足可见性，那就从undo log中找更旧版本的数据，然后重新上述比较过程，直到找到满足条件的版本的数据。

## MySQL优化

参考https://zhuanlan.zhihu.com/p/59818056

### SQL查询优化

前面提到的分库分表、读写分离都可以答。

1、优化COUNT()查询

​	有时候某些业务场景并不需要完全精确的COUNT值，可以用近似值来代替，EXPLAIN出来的行数就是一个不错的近似值，而且执行EXPLAIN并不需要真正地去执行查询，所以成本非常低。

2、

### 索引优化

1、前缀索引

​	如果列很长，通常可以索引开始的部分字符，这样可以有效节约索引空间，从而提高索引效率

2、覆盖索引

​	如果一个索引包含或者说覆盖所有需要查询的字段的值，那么就没有必要再回表查询，这就称为覆盖索引。覆盖索引是非常有用的工具，可以极大的提高性能

3、删去冗余索引

​	冗余索引会增加维护B+TREE平衡时的性能消耗，并且占用磁盘空间。比如：

```sql
create index idx_name on users(name)
create index idx_name_age on users(name, age)
```

​	在上面解决方案中，根据最左匹配原则，idx_name为冗余索引， where name = ?同样可以利用索引idx_name_age进行检索。

4、删除长期未使用的索引

定期删除一些长时间未使用过的索引是一个非常好的习惯



### 数据库表结构优化

​	使数据库结构符合三大范式。



## 其他面试问题

1、如果某个表有近千万数据，CRUD比较慢，如何优化。
（1）分库分表
	某个表有近千万数据，可以考虑优化表结构，分表（水平分表，垂直分表），当然，你这样回答，需要准备好面试官问你的分库分表相关问题呀，如

​		分表方案（水平分表，垂直分表，切分规则hash等）
​		分库分表中间件（Mycat，sharding-jdbc等）
​		分库分表一些问题（事务问题？跨节点Join的问题）
​		解决方案（分布式事务等）
（2）索引优化
​	除了分库分表，优化表结构，当然还有所以索引优化等方案~

2、 一条sql执行过长的时间，你如何优化，从哪些方面入手？

- 查看是否涉及多表和子查询，优化Sql结构，如去除冗余字段，是否可拆表等
- 优化索引结构，看是否可以适当添加索引
- 数量大的表，可以考虑进行分离/分表（如交易流水表）
- 数据库主从分离，读写分离
- explain分析sql语句，查看执行计划，优化sql
- 查看mysql执行日志，分析是否有其他方面的问题

3、一条SQL语句在MySQL中如何执行的？

先看一下Mysql的逻辑架构图吧~

<img src="https://gitee.com/senbird/typora_pic/raw/master/pic/20180831160049148" alt="这里写图片描述" style="zoom:80%;" />

> 有的架构图认为，优化器和存储引擎之间还有一个执行器。
>
> Mysql逻辑架构图主要分三层：
>
> - 第一层负责连接处理，授权认证，安全等等；
> - 第二层负责编译并优化SQL；
> - 第三层是存储引擎。

所以执行过程大致是：

- 先检查该语句是否有权限
- 如果没有权限，直接返回错误信息
- 如果有权限，在 MySQL8.0 版本以前，会先查询缓存。
- 如果没有缓存，分析器进行词法分析，提取 sql 语句select等的关键元素。然后判断sql 语句是否有语法错误，比如关键词是否正确等等。
- 优化器进行确定执行方案
- 进行权限校验，如果没有权限就直接返回错误信息，如果有权限就会调用数据库引擎接口，返回执行结果。

# Web开发

## 网络编程基础

java基本的网络编程参考视频：https://www.bilibili.com/video/BV1ny4y1Y7CW 中 618-628节的内容。

视频对应的笔记：https://blog.csdn.net/PorkBird/article/details/113727633



### TCP网络编程

下面是一个典型的TCP网络通信过程：

> idea中新建两个文件，分别执行这两个文件的main方法，就会同时开启客户端和服务端程序，注意要先开启服务端再开启客户端。

服务端程序：

```java
package TCP_Server;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(6666); // 创建服务器端的ServerSocket，指明自己的端口号
        System.out.println("server is running...");
        for (;;) {
            /*--accept()的用处？--
            * ss.accept()表示每当有新的客户端连接进来后，就返回一个Socket实例，这个Socket实例就是用来和刚连接的客户端进行通信的。
            * 由于客户端很多，要实现并发处理，我们就必须为每个新的Socket创建一个新线程来处理，这样，主线程的作用就是接收新的连接，
            * 每当收到新连接后，就创建一个新线程进行处理。
            */
            Socket sock = ss.accept();
            System.out.println("connected from " + sock.getRemoteSocketAddress());//本地测试的时候输出是：connected from /127.0.0.1:56113
            Thread t = new Handler(sock);//创建一个线程来处理与sock这个client的通信
            t.start();//调用run方法执行处理
        }
    }
}
class Handler extends Thread {
    Socket sock;
    public Handler(Socket sock) {
        this.sock = sock;
    }
    @Override
    public void run() {
        try (InputStream input = this.sock.getInputStream()) {
            try (OutputStream output = this.sock.getOutputStream()) {
                handle(input, output);//input表示client输入到server的流，output表示server输出到client的流（注意，输入/出流都是从自己的角度来看的）
            }
        } catch (Exception e) {
            try {
                this.sock.close();//尝试关闭与这个client的连接
            } catch (IOException ioe) {
            }
            System.out.println("client disconnected.");
        }
    }
    private void handle(InputStream input, OutputStream output) throws IOException {
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
        BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
        writer.write("hello\n");//每一个新连接的client都会输出字符串来打个招呼，client收到后会打印出来
        writer.flush();
        /*--为什么写入网络数据时，要调用flush()方法？--
        * 如果不调用flush()，我们很可能会发现，客户端和服务器都收不到数据，这并不是Java标准库的设计问题，而是我们以流的形式写入数据的时候，
        * 并不是一写入就立刻发送到网络，而是先写入内存缓冲区，直到缓冲区满了以后，才会一次性真正发送到网络，这样设计的目的是为了提高传输效率。
        * 如果缓冲区的数据很少，而我们又想强制把这些数据发送到网络，就必须调用flush()强制把缓冲区数据发送出去（感觉就像是写完短信之后按的发送键）。
        */
        for (;;) {
            String s = reader.readLine();
            if (s.equals("bye")) {
                writer.write("bye\n");
                writer.flush();
                break;
            }
            writer.write("ok: " + s + "\n");//客户端发过来的字符串，这里加上一个“ok”之后再发回给客户端
            writer.flush();
        }
    }
}
```

客户端程序：

```java
package TCP_Client;

import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket sock = new Socket("localhost", 6666); // 连接指定服务器和端口
        try (InputStream input = sock.getInputStream()) {
            try (OutputStream output = sock.getOutputStream()) {
                handle(input, output);//handle里面有循环语句来使客户端一直活跃，也有break来终止客户端
            }
        }
        sock.close();
        System.out.println("disconnected.");
    }
    private static void handle(InputStream input, OutputStream output) throws IOException {
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
        BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
        Scanner scanner = new Scanner(System.in);
        System.out.println("[server] " + reader.readLine());//输出为：[server] hello
        for (;;) {
            System.out.print(">>> "); // 打印提示
            String s = scanner.nextLine(); // 读取一行输入
            writer.write(s);//写入到输出流
            writer.newLine();
            writer.flush();
            String resp = reader.readLine();//从本输入流获取服务端发过来的消息
            System.out.println("<<< " + resp);
            if (resp.equals("bye")) {//循环终止条件
                break;
            }
        }
    }
}
```

### UDP网络编程

​	和TCP编程相比，UDP编程就简单得多，因为UDP没有创建连接，数据包也是一次收发一个，所以没有流的概念。

​	在Java中使用UDP编程，仍然需要使用Socket，因为应用程序在使用UDP时必须指定网络接口（IP）和端口号。

> 注意：UDP端口和TCP端口虽然都使用0~65535，但他们是两套独立的端口，即一个应用程序用TCP占用了端口1234，不影响另一个应用程序用UDP占用端口1234。

服务端程序：

```java
package UDP_Server;

import java.io.*;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.nio.charset.StandardCharsets;

public class Server {
    public static void main(String[] args) throws IOException {
        DatagramSocket ds = new DatagramSocket(6666); // 监听指定端口
        System.out.println("server is running...");
        for (;;) { // 无限循环
            byte[] buffer = new byte[1024];// 数据缓冲区
            //DatagramPacket 对象封装了UDP数据报，在数据报中包含了发送端的IP地址和端口号以及接收端的IP地址和端口号。
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
// 收到数据：
            ds.receive(packet); // 收取一个UDP数据包
            // 收取到的数据存储在buffer中，由packet.getOffset(), packet.getLength()指定起始位置和长度
            // 将其按UTF-8编码转换为String:
            String s = new String(packet.getData(), packet.getOffset(), packet.getLength(), StandardCharsets.UTF_8);
            System.out.println("receive: "+s);
// 发送数据:
            byte[] data = "ACK".getBytes(StandardCharsets.UTF_8);
            packet.setData(data);//还是上面的那个packet，所以IP地址它依然记得，也就能发给相应的客户端
            ds.send(packet);
        }
    }
}
```

客户端程序：

```java
package UDP_Client;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Client {
    public static void main(String[] args) throws IOException {
        DatagramSocket ds = new DatagramSocket();
        ds.setSoTimeout(1000);//设定超时1秒，意思是后续接收UDP包时，等待时间最多不会超过1秒。否则在没有收到UDP包时，客户端会无限等待下去
        ds.connect(InetAddress.getByName("localhost"), 6666); // 连接指定服务器和端口
// 发送:
        byte[] data = "Hello".getBytes();
        DatagramPacket packet = new DatagramPacket(data, data.length);
        System.out.println("send: Hello");
        ds.send(packet);
// 接收:
        byte[] buffer = new byte[1024];
        packet = new DatagramPacket(buffer, buffer.length);
        ds.receive(packet);
        String resp = new String(packet.getData(), packet.getOffset(), packet.getLength());
        System.out.println("receive: "+resp);
        ds.disconnect();//如果客户端认为通信结束，就可以调用disconnect()断开连接
    }
}
```

>​	注意到客户端的`DatagramSocket`还调用了一个`connect()`方法“连接”到指定的服务器端。不是说UDP是无连接的协议吗？为啥这里需要`connect()`？
>
>​	这个`connect()`方法不是真连接，它是为了在客户端的`DatagramSocket`实例中保存服务器端的IP和端口号，确保这个`DatagramSocket`实例只能往指定的地址和端口发送UDP包，不能往其他地址和端口发送。这么做不是UDP的限制，而是Java内置了安全检查。
>
>​	如果客户端希望向两个不同的服务器发送UDP包，那么它必须创建两个`DatagramSocket`实例。
>
>​	后续的收发数据和服务器端是一致的。通常来说，客户端必须先发UDP包，因为客户端不发UDP包，服务器端就根本不知道客户端的地址和端口号。

### HTTP编程

​	[HTTP编程](https://www.liaoxuefeng.com/wiki/1252599548343744/1319099982413858)（URL编程）和TCP编程类似，因为前面也提到了，HTTP的底层是TCP/IP。下面介绍HTTP编程的方式。

（1）早期的JDK版本是通过`HttpURLConnection`访问HTTP，但代码编写比较繁琐，并且需要手动处理`InputStream`，所以用起来很麻烦。

（2）从Java 11开始，引入了新的`HttpClient`，它使用链式调用的API，并能通过内置的`BodyPublishers`和`BodyHandlers`来大大简化HTTP的处理。

> 使用时首先需要创建一个全局`HttpClient`实例，因为`HttpClient`内部使用线程池优化多个HTTP连接，可以复用：
>
> ```java
> static HttpClient httpClient = HttpClient.newBuilder().build();
> ```

下面是使用`GET`请求获取文本内容代码的客户端代码：

```java
import java.net.URI;
import java.net.http.*;
import java.net.http.HttpClient.Version;
import java.time.Duration;
import java.util.*;

public class Main {
    static HttpClient httpClient = HttpClient.newBuilder().build();// 全局HttpClient

    public static void main(String[] args) throws Exception {
        String url = "https://www.sina.com.cn/";
        HttpRequest request = HttpRequest.newBuilder(new URI(url))
            .header("Accept", "*/*")// 设置Header
            .header("User-Agent", "Java HttpClient")
            .timeout(Duration.ofSeconds(5))// 设置超时
            .version(Version.HTTP_2).build();// 设置版本
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());//这里用到了BodyHandlers
        // HTTP允许重复的Header，因此一个Header可对应多个Value:
        Map<String, List<String>> headers = response.headers().map();
        for (String header : headers.keySet()) {
            System.out.println(header + ": " + headers.get(header).get(0));
        }
        System.out.println(response.body().substring(0, 1024) + "...");
    }
}
```

>​	如果我们要获取图片这样的二进制内容，只需要把`HttpResponse.BodyHandlers.ofString()`换成`HttpResponse.BodyHandlers.ofByteArray()`，就可以获得一个`HttpResponse<byte[]>`对象。
>
>​	如果响应的内容很大，不希望一次性全部加载到内存，可以使用`HttpResponse.BodyHandlers.ofInputStream()`获取一个`InputStream`流。

要使用`POST`请求，我们要准备好发送的Body数据并正确设置`Content-Type`：

```java
String url = "http://www.example.com/login";
String body = "username=bob&password=123456";
HttpRequest request = HttpRequest.newBuilder(new URI(url))
    .header("Accept", "*/*")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .timeout(Duration.ofSeconds(5))
    .version(Version.HTTP_2)
    .POST(BodyPublishers.ofString(body, StandardCharsets.UTF_8)).build();// 使用POST并设置Body，这里用到了BodyPublishers
HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());//这里用到了BodyHandlers
String s = response.body();
```





# Maven

参考https://zhuanlan.zhihu.com/p/62841181

## 为什么使用Maven

1）、 一个项目就是一个工程

如果项目非常庞大，就不适合使用package来划分模块，最好是每一个模块对应一个工程，利于分工协作。借助于maven就可以将一个项目拆分成多个工程

2）、项目中使用jar包，需要“复制”、“粘贴”项目的lib中

同样的jar包重复的出现在不同的项目工程中，你需要做不停的复制粘贴的重复工作。借助于maven，可以将jar包保存在“仓库”中，不管在哪个项目只要使用引用即可。

3）、jar包需要的时候每次都要自己准备好或到官网下载

借助于maven我们可以使用统一的规范方式下载jar包

4）、jar包版本不一致的风险

不同的项目在使用jar包的时候，有可能会导致各个项目的jar包版本不一致，导致未执行错误。借助于maven，所有的jar包都放在“仓库”中，所有的项目都使用仓库的一份jar包。

5）、一个jar包依赖其他的jar包需要自己手动的加入到项目中

FileUpload组件->IO组件，commons-fileupload-1.3.jar依赖于commons-io-2.0.1.jar

极大的浪费了我们导入包的时间成本，也极大的增加了学习成本。借助于maven，它会自动的将依赖的jar包导入进来。

## maven是什么

1、maven是一款服务于java平台的自动化构建工具

​	make->Ant->Maven->Gradle

​	名字叫法：我们可以叫妹文也可以叫麦文，但是没有叫妈文的。

2、构建

​	构建定义：把动态的Web工程经过编译得到的编译结果部署到服务器上的整个过程。

​	编译：java源文件[.java]->编译->Class字节码文件[.class]

​	部署：最终在sevlet容器中部署的不是动态web工程，而是编译后的文件

> 构建的各个环节
>
> ​	清理clean：将以前编译得到的旧文件class字节码文件删除
> ​	编译compile：将java源程序编译成class字节码文件
> ​	测试test：自动测试，自动调用junit程序
> ​	报告report：测试程序执行的结果
> ​	打包package：动态Web工程打War包，java工程打jar包
> ​	安装install：Maven特定的概念-----将打包得到的文件复制到“仓库”中的指定位置
> ​	部署deploy：将动态Web工程生成的war包复制到Servlet容器下，使其可以运行

3、仓库

​	分为本地仓库和远程仓库。
​	远程仓库包括：
​	（1）中央仓库：默认是国外，所以一般要手动配置为国内的镜像；
​	（2）私服：应用于局域网，maven下载构件时，首先去私服找（公司一般会给搭建好）；
​	（3）其他公共库：比如阿里云的镜像。

## Maven标准目录（规约）

- src
  - main
    - **java**     源文件 
    - **resources**   资源文件，可以创建几个子文件夹来分别配置不同环境下（比如本地环境、测试环境、正式环境）的配置，然后，统一在pom.xml中，使用profiles标签来分别声明这些配置，再使用resources标签（build下）来设置资源文件配置（有哪些配置，需要获取哪些后缀的配置文件等）。
    - filters  资源过滤文件
    - config  配置文件
    - scripts  脚本文件
    - webapp  web应用文件
  - test
    - **java**   测试源文件
    - resources   测试资源文件
    - filters   测试资源过滤文件
  - it    集成测试
  - assembly   assembly descriptors
  - site   Site
- target
  - generated-sources
  - classes
  - generated-test-sources
  - test-classes
  - xxx.jar
- **pom.xml**
- LICENSE.txt
- NOTICE.txt
- README.txt

## 常用maven命令

- mvn clean //清理，运行mvn clean，发现整个target文件夹都没了。
- mvn compile //编译主程序，此时src同级目录下会多一个target文件夹，编译后的class文件在classes子文件夹下
- mvn test-compile //编译测试程序，此时target文件夹下面除了classes之外多了test-classes文件夹
- mvn test //执行测试
- mvn package //打包，运行mvn package，target文件夹下面又多了一个打好的jar包
- mvn install //将项目本身编译并打包到本地仓库，本地仓库会新增对应工程的jar包
- mvn idea:idea //生成idea项目

## pom.xml

参考https://www.cnblogs.com/tanghaoran-blog/p/10429329.html

1、setting.xml主要用于配置maven的运行环境等一系列通用的属性，是全局级别的配置文件；
而pom.xml主要描述了项目的maven坐标，依赖关系，开发者需要遵循的规则，缺陷管理系统，组织和licenses，以及其他所有的项目相关因素，是项目级别的配置文件。

2、一个典型的pom.xml文件配置如下：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <!-- 模型版本。maven2.0必须是这样写，现在是maven2唯一支持的版本 -->  
    <modelVersion>4.0.0</modelVersion>  
    
    <!-- 公司或者组织的唯一标志，配置时生成的路径也是由此生成， 如com.winner.trade，maven会将该项目打成的jar包放本地路径：/com/winner/trade -->  
    <groupId>com.winner.trade</groupId>  
    <!-- 本项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->  
    <artifactId>trade-core</artifactId>  
    <!-- 本项目目前所处的版本号 -->  
    <version>1.0.0-SNAPSHOT</version>  
  
    <!-- 打包的机制，如pom,jar, maven-plugin, ejb, war, ear, rar, par，默认为jar -->  
    <packaging>jar</packaging>  
  
    <!-- 帮助定义构件输出的一些附属构件,附属构件与主构件对应，有时候需要加上classifier才能唯一的确定该构件 不能直接定义项目的classifer,因为附属构件不是项目直接默认生成的，而是由附加的插件帮助生成的 -->  
    <classifier>...</classifier>  
  
    <!-- 定义本项目的依赖关系 -->  
    <dependencies>  
        <!-- 每个dependency都对应这一个jar包 -->  
        <dependency>  
            <!-- 一般情况下，maven是通过groupId、artifactId、version这三个元素值（俗称坐标）来检索该构件， 然后引入你的工程。如果别人想引用你现在开发的这个项目（前提是已开发完毕并发布到了远程仓库），就需要在他的pom文件中新建一个dependency节点，将本项目的groupId、artifactId、version写入， maven就会把你上传的jar包下载到他的本地。另外，引入依赖的时候，有时候仅凭groupId、artifactId、version无法唯一的确定某个构件，需要借助classifier来进一步明确目标。比如JSON-lib，有时候会同一个版本会提供多个jar包，在JDK1.5环境下是一套，在JDK1.3环境下是一套-->  
            <dependency>  <!--不用怕这些字段记不住，想用哪些包，就去 mvnrepository.com 里搜，里面贴了dependency的内容，copy过来就行-->
           		<groupId>net.sf.json-lib</groupId>  
           		<artifactId>json-lib</artifactId>  
            	<version>2.4</version>  
           		<classifier>jdk15</classifier>  
			</dependency>
            
            <!-- maven认为，程序对外部的依赖会随着程序的所处阶段和应用场景而变化，所以maven中的依赖关系有作用域(scope)的限制。
			scope包含如下的取值：
				compile（编译范围，依赖的默认范围，该依赖需要参与当前项目的编译、测试、运行、打包）；
				provided（已提供范围，即编译、测试时有效，运行时无效，比如servlet-api，运行的时候因为容器已提供，就不需要maven重复地引入一遍）；
				runtime（运行时范围，表示依赖无需参与当前项目的编译，但是后期的运行和测试需要参与，比如JDBC驱动）；
				test（测试范围，主代码无效，比如JUnit）；
				system（系统范围，和provided范围一样，但被依赖项不会从maven仓库下载，而是从本地系统指定路径下寻找，谨慎使用） -->  
            <scope>test</scope>  
            <!-- 设置指依赖是否可选，默认为false,即子项目默认都继承:为true,则子项目必需显示的引入，与dependencyManagement里定义的依赖类似  -->  
            <optional>false</optional>  
            <!-- 屏蔽依赖关系，解决依赖冲突。 
				比如项目中使用的libA依赖某个库的1.0版，libB依赖某个库的2.0版，现在想统一使用2.0版，就应该屏蔽掉对1.0版的依赖 -->  
            <exclusions>  
                <exclusion>  
                    <groupId>org.slf4j</groupId>  
                    <artifactId>slf4j-api</artifactId>  
                </exclusion>  
            </exclusions>  
        </dependency>  
    </dependencies>  
  
    <!-- 为pom定义一些常量，在pom中的其它地方可以直接引用 使用方式 如下 ：${file.encoding} 
	详情参考 https://www.cnblogs.com/cuiqq/p/11023886.html -->  
    <properties>  
        <file.encoding>UTF-8</file.encoding>  
        <java.source.version>1.5</java.source.version>  
        <java.target.version>1.5</java.target.version>  
    </properties>  
    ...  
</project> 
```

> 上面的只是基础配置，还有一些构建配置等，可以参考上面给的链接网址去查看。



# Spring5

> 通过视频学习：https://www.bilibili.com/video/BV1Vf4y127N5?p=3
>
> 相关的别人的笔记：https://blog.csdn.net/OYMNCHR/article/details/120077303
>
> 网上有一个[思维导图](https://img-blog.csdnimg.cn/20200830141924415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2phdmFfY3hycw==,size_16,color_FFFFFF,t_70)，打开后点击一下图片就会自动放大到合适的比例，不用手动滚轮放大。

## 介绍	

​	随着Spring越来越受欢迎，在Spring Framework基础上，又诞生了Spring Boot、Spring Cloud、Spring Data、Spring Security等一系列基于Spring Framework的项目。本章我们只介绍Spring Framework，即最核心的Spring框架。后续章节我们还会涉及Spring Boot、Spring Cloud等其他框架。

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/788498-358a3764fcbca0e4.png)

> 详情可参考[spring框架介绍](https://www.jianshu.com/p/7b6a070119c7)。

Spring 有两个核心部分：IOC 和 Aop

（1）IOC：控制反转，把创建对象过程交给 Spring 进行管理

（2）Aop：面向切面，不修改源代码进行功能增强

## IOC容器

### 什么是容器

​	容器是一种为某种特定组件的运行提供必要支持的一个软件环境。例如，Tomcat就是一个Servlet容器，它可以为Servlet的运行提供运行环境。类似Docker这样的软件也是一个容器，它提供了必要的Linux环境以便运行一个特定的Linux进程。
​	通常来说，使用容器运行组件，除了提供一个组件运行环境之外，容器还提供了许多底层服务。例如，Servlet容器底层实现了TCP连接，解析HTTP协议等非常复杂的服务，如果没有容器来提供这些服务，我们就无法编写像Servlet这样代码简单，功能强大的组件。早期的JavaEE服务器提供的EJB容器最重要的功能就是通过声明式事务服务，使得EJB组件的开发人员不必自己编写冗长的事务处理代码，所以极大地简化了事务处理。

​	Spring的核心就是提供了一个IoC容器，它可以管理所有轻量级的JavaBean组件，提供的底层服务包括组件的生命周期管理、配置和组装服务、AOP支持，以及建立在AOP基础上的声明式事务服务等。

### 什么是IOC

- IOC，即控制反转，是把对象创建和对象的调用过程交给spring进行管理。

  > ​	IoC又称为依赖注入（DI：Dependency Injection），它解决了一个最主要的问题：将组件的创建+配置与组件的使用相分离，并且，由IoC容器负责管理组件的生命周期。

- 目的：降低耦合度

- 底层原理：xml，反射，工厂模式

> ​	如果一个系统有大量的组件，其生命周期和相互之间的依赖关系如果由组件自身来维护，不但大大增加了系统的复杂度，而且会导致组件之间极为紧密的耦合，继而给测试和维护带来了极大的困难。
> ​	因此，核心问题是：
> ​		谁负责创建组件？
> ​		谁负责根据依赖关系组装组件？
> ​		销毁时，如何按依赖顺序正确销毁？
> ​	解决这一问题的核心方案就是IoC。

> ​	传统的应用程序中，控制权在程序本身，程序的控制流程完全由开发者控制。
>
> ​	在IoC模式下，控制权发生了反转，即从应用程序转移到了IoC容器，所有组件不再由应用程序自己创建和配置，而是由IoC容器负责，这样，应用程序只需要直接使用已经创建好并且配置好的组件。

### Bean管理

​	因为IoC容器要负责实例化所有的组件，因此，有必要告诉容器如何创建组件，以及各组件的依赖关系。在Spring的IoC容器中，我们把所有组件统称为JavaBean，即配置一个组件就是配置一个Bean。

​	而Bean管理简单来看就是指两个操作：Spring创建对象 和 Spring注入属性。

​	Bean管理有两种操作方式：基于xml配置文件方式实现 和 基于注解方式实现。

>基于xml配置文件方式实现又有两种常用方式：使用set方法进行注入 和 使用有参构造函数进行注入。（还有一个p名称空间注入，不常用）





# Redis

## 缓存穿透、缓存击穿、缓存雪崩

>缓存处理流程：
>
>​	前台请求，后台先从缓存中取数据，取到直接返回结果，取不到时从数据库中取，数据库取到更新缓存，并返回结果，数据库也没取到，那直接返回空结果。

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20180919143214712)

### 缓存穿透

​	缓存穿透是指缓存和数据库中都没有的数据，而用户不断发起请求，如发起为id为“-1”的数据或id为特别大不存在的数据，导致这个不存在的数据每次请求都要到存储层去查询。这时的用户很可能是攻击者，攻击会导致数据库压力过大。

解决方案：

- 采用布隆过滤器，将所有可能存在的数据哈希到一个足够大的bitmap中，一个一定不存在的数据会被这个bitmap拦截掉，从而避免了对底层存储系统的查询压力；
- 接口层增加校验，如用户鉴权校验，id做基础校验，id<=0的直接拦截；
- 从缓存取不到的数据，在数据库中也没有取到，仍然把这个空结果进行缓存，这时可以将key-value对写为key-null，缓存有效时间可以设置短点，如30秒（设置太长会导致正常情况也没法使用）。这样可以防止攻击用户反复用同一个id暴力攻击；

### 缓存击穿

​	缓存击穿是指缓存中没有但数据库中有的某条数据（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力。

解决方案：

- 设置热点数据永远不过期
- 加互斥锁，如下图所示，就是让一个人去取到缓存就行了，不要一窝蜂都去，其他人等着（Thread.sleep(100)这句的效果）。

![img](https://gitee.com/senbird/typora_pic/raw/master/pic/20180919143214879)

### 缓存雪崩

​	缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。

解决方案：

- 缓存数据的过期时间设置随机（在原有的失效时间基础上增加一个随机值），防止同一时间大量数据过期现象发生。
- 设置热点数据永远不过期。



# --END--











