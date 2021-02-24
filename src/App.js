import { Deck, Slide, Text, Heading, OrderedList, ListItem, CodePane, Link, Table, TableRow, TableCell } from 'spectacle';
import './App.css';
const theme = {
  colors: {
    primary: '#fff',
    secondary: '#f5f5f5',
    tertiary: '#705697AA'
  },
  fonts: 'Quicksand'
}
function App() {
  return (
    <Deck theme={theme}>
      <Slide>
        <Heading>TypeScript: Zero to Hero</Heading>
        <Table className="table-new">
          <TableRow>

            <TableCell flex="1" width="50%" height="100%">
              <div className="img"></div>
            </TableCell>
            <TableCell flex="1" width="50%" height="100%">

              <Text fontSize="h5">Priyanka Shete</Text>
              <Text fontSize="h6">Senior software developer</Text>
              <Link href="http://piyukore06.netlify.app/">priyanka.codes</Link>
            </TableCell>
          </TableRow>
        </Table>
      </Slide>

      <Slide>
        <Heading>
          Goal: Explore typescript features
        </Heading>
        <OrderedList>
          <ListItem>
            <Link href="https://www.typescriptlang.org/play">Typescript playground</Link>
          </ListItem>
          <ListItem>
            <Link href="https://astexplorer.net/">AST explorer</Link>
          </ListItem>
        </OrderedList>
      </Slide>

      <Slide>
        <Heading>Union types 🤔</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
      function padLeft(value: string, padding: any) {
        if (typeof padding === "number") {
          return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
          return padding + value;
        }
        throw new Error('Only number or string type are supported');
      }
      `}
        </CodePane>
      </Slide>

      <Slide>
        <Heading>Union types 💡</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
      function padLeft(value: string, padding: number | string) {

        if (typeof padding === "number") {
          return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
          return padding + value;
        }
        throw new Error('Only number or string type are supported');
      }
      `}
        </CodePane>
      </Slide>
      <Slide>
        <Heading>Nullable types 🤔</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
  interface Member {
      name: string,
      age?: number
  }

  function setMember(member: Member) {
    const stringifyAge = member.age.toString(); // Cannot read property 'toString' of undefined
  }
      `}
        </CodePane>
      </Slide>


      <Slide>
        <Heading>Discriminated Unions 🤔</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
type NetworkState = {
  state: 'loading' | 'success' | 'failed';
  code?: number; // available only when request has failed
  response?: {
    title: string;
    duration: number;
    summary: string;
  }; // available only when request successful
}

function logger(state: NetworkState) {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // The type must be NetworkFailedState here,
      // so accessing the 'code' field is safe
      return "Error  downloading " + state.code;
    case "success":
      return "Downloaded " + state.response.title;
  }
}
      `}
        </CodePane>
      </Slide>
      <Slide>
        <Heading>Discriminated Unions 💡</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
type NetworkLoadingState = {
  state: "loading";
};
type NetworkFailedState = {
  state: "failed";
  code: number;
};
type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function logger(state: NetworkState) {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // The type must be NetworkFailedState here,
      // so accessing the 'code' field is safe
      return "Error  downloading " + state.code;
    case "success":
      return "Downloaded " + state.response.title;
  }
}
      `}
        </CodePane>
      </Slide>

      <Slide>
        <Heading>Generic Types 🤔</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
class AnyList {
  private values: any[] = [];

  constructor (values: any[] = []) {
      this.values = values;
  }
  public add(value: any): void {
      this.values.push(value);
  }
}

class User {
    name: string;
    constructor(name: string) { this.name = name; }
}

const intList = new AnyList();
intList.add(4);

const stringList = new AnyList();
stringList.add('hello');

const userList = new AnyList();
userList.add(new User('Jamie'));
      `}
        </CodePane>
      </Slide>

      <Slide>
        <Heading>Generics Types 💡</Heading>

        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`
class TypedList<T> {
  private values: T[] = [];

  constructor (values: T[] = []) {
    this.values = values;
  }

  public add(value: T): void {
      this.values.push(value);
  }
}

class User {
  name: string;
  constructor(name: string) { this.name = name; }
}

const intList = new TypedList<number>();
intList.add(4);

const stringList = new TypedList<string>();
stringList.add('hello');

const userList = new TypedList<User>();
userList.add(new User('Jamie'));
      
      `}</CodePane>
      </Slide>
      <Slide>
        <Heading>Keyof Types 🤔</Heading>
        <CodePane
          language="javascript"
          theme="duotoneLight"
        >
          {`

interface User {
  firstName: string;
  lastName: string;
}

const user: User = {
  firstName: "Type",
  lastName: "Script"
};
      
function getProperty(obj: User, key: string) {
  return obj[key];
}
      `}</CodePane>
      </Slide>
      <Slide>
        <Heading>Keyof Types 💡</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">
          {`
    interface User {
      firstName: string;
      lastName: string;
    }
    
    const user: User = {
      firstName: "Type",
      lastName: "Script"
    };
          
    function getProperty<Obj>(obj: Obj, key: keyof Obj): Obj[keyof Obj] {
      return obj[key];
    }
    `}
        </CodePane>
      </Slide>
      <Slide>
        <Heading>Tuple Types 🤔</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
        type SuccessData = {
            success: true;
            response: {};
        };
        
        type ErrorData = {
            success: false;
            error: string
            description: string;
        }
        
        function splitSuccessAndErrorData(data: SuccessData[] | ErrorData[]) {
            const successData = [];
            const errorData = [];
            data.forEach((d) => {
                if (d.success) {
                    successData.push(d);
                } else {
                    errorData.push(d);
                }
            });
            return [successData, errorData];
        }
        `}</CodePane>
      </Slide>

      <Slide>
        <Heading>Tuple Types 💡</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
      type SuccessData = {
          success: true;
          response: {};
      };
      
      type ErrorData = {
          success: false;
          error: string
          description: string;
      }
      
      function splitSuccessAndErrorData(data: SuccessData[] | ErrorData[]): [SuccessData[], ErrorData[]] {
          const successData: SuccessData[] = [];
          const errorData: ErrorData[] = [];
          data.forEach((d) => {
              if (d.success) {
                  successData.push(d);
              } else {
                  errorData.push(d);
              }
          });
          return [successData, errorData];
      }
        `}</CodePane>
      </Slide>
      <Slide>
        <Heading>Type Predicates / User Defined Type Guards 🤔</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
    interface Cat {
      numberOfLives: number;
    }
    interface Dog {
      isAGoodBoy: boolean;
    }
      
    let animal: Cat | Dog;
    
    function logger(animal: Cat | Dog) {
        console.log(animal)
    }
      `}</CodePane>
      </Slide>

      <Slide>
        <Heading>Type Predicates / User Defined Type Guards 💡</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
    interface Cat {
      kind: 'cat';
      numberOfLives: number;
    }
    interface Dog {
      kind: 'dog';
      isAGoodBoy: boolean;
    }
      
    let animal: Cat | Dog;
    
    function isCat(animal: Cat | Dog): animal is Cat {
      return animal.kind === 'cat';
    }
    
    function logger(animal: Cat | Dog) {
      if (isCat(animal)) {
        console.log(animal)
      }
    }
      `}</CodePane>
      </Slide>
      <Slide>
        <Heading>Utility / Mapped types 🤔</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
    interface Todo {
      title: string;
      description: string;
    }
    
    function updateTodo(todo: Todo, fieldsToUpdate: Todo) {
      return { ...todo, ...fieldsToUpdate };
    }
    const todo1 = { title: 'Update tsconfig', description: 'enable strictNullChecks' };
    
    updateTodo(todo1, { description: 'enable noImplicitAny' });
      `}</CodePane>
      </Slide>
      <Slide>
        <Heading>Utility / Mapped types 💡</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
    interface Todo {
      title: string;
      description: string;
    }
    
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
      return { ...todo, ...fieldsToUpdate };
    }
    
    const todo1 = { title: 'Update tsconfig', description: 'enable strictNullChecks' };
    
    updateTodo(todo1, { description: 'enable noImplicitAny' });
      `}</CodePane>
        <Heading fontSize="h6">In addition to Partial, there's many more Utility types</Heading>
      </Slide>
      <Slide>
        <Heading>Inferred Types</Heading>
        <CodePane language="javascript"
          theme="duotoneLight">{`
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";

// Takes
//   | "top-left"    | "top-center"    | "top-right"
//   | "middle-left" | "middle-center" | "middle-right"
//   | "bottom-left" | "bottom-center" | "bottom-right"

function setAlignment(value: '$VerticalAlignment-$HorizontalAlignment'): void { }

setAlignment("top-left");   // works!
setAlignment("top-middel"); // error!
      `}
        </CodePane>
      </Slide>
      <Slide>
        <Heading>Thank you 🙏🏻</Heading>
      </Slide>
    </Deck>
  );
}

export default App;
