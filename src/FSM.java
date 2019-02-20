import java.util.ArrayList;
import java.util.HashMap;

public class FSM {
	
	private HashMap<FSM_State,ArrayList<FSM_State>> transitionMap;
	private FSM_State actualState;
	
	public FSM (HashMap<FSM_State,ArrayList<FSM_State>> transitionMap, FSM_State initState) {
		this.actualState=initState;
		this.transitionMap=transitionMap;
	}
	
	public void run() {
		while(true) {
			actualState=transitionMap.get(actualState).get(actualState.getStatus());
			actualState.run();
		}
	}
}
