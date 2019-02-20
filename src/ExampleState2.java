import java.util.Scanner;

public class ExampleState2 extends FSM_State {

	private int status;
	
	public ExampleState2() {
		status=0;
	}
	
	@Override
	public void run() {
		Scanner scan = new Scanner(System.in);
		System.out.println("cuanto son 2+2");
		if(Integer.parseInt(scan.nextLine())==4)
			status=1;
		//scan.close();	
	}

	@Override
	public int getStatus() {
		return status;
	}

}
