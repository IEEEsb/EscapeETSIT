import java.util.ArrayList;
import java.util.HashMap;

public class Main {

	public static void main(String[] args) {
		System.out.println("Hello World");
		
		
		HashMap<FSM_State,ArrayList<FSM_State>> transitionMap= new HashMap<>();
		
		FSM_State s1 = new ExampleState1();
		FSM_State s2 = new ExampleState2();
		
		ArrayList<FSM_State> l1 = new ArrayList<FSM_State>();
		l1.add(s1);
		l1.add(s2);
		transitionMap.put(s1, l1);
		
		ArrayList<FSM_State> l2 = new ArrayList<FSM_State>();
		l2.add(s2);
		l2.add(s1);
		transitionMap.put(s2, l2);
		
		FSM fsm = new FSM(transitionMap,s1);
		fsm.run();
		
		
	}

}
