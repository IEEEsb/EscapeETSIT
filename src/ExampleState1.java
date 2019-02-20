import java.util.Scanner;

public class ExampleState1 extends FSM_State {

	private int status;
	
	public ExampleState1() {
		status=0;
	}
	
	@Override
	public void run() {
		Scanner scan = new Scanner(System.in);
		System.out.println("cuanto son 5-3");
		if(Integer.parseInt(scan.nextLine())==2)
			status=1;
		//scan.close();
	}

	@Override
	public int getStatus() {
		return status;
	}

}
