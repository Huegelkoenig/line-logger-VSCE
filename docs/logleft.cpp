using namespace std;

int doSomething(int param){ //this is broken and needs to be debuged
  cout << "function doSomething() was called with param " << param << "\n";
  //some code
  cout << "function doSomething(), line " << /*LL*/ << ": The value of var is " << var << "\n";
  //some more code
  cout << "function doSomething(), line " << /*LL*/ << ": The value of var is " << var << "\n";
  //some code
  return var;
}

int main()
{
  int returnValue = doSomething();
  cout << "function main(): The function doSomething() on line " << /*LL*/ -1 << " returned " << returnValue << "\n";  
}



