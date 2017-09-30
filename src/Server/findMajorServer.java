package Server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import Major.MajorConnection;

public class findMajorServer extends HttpServlet{
		public void service(HttpServletRequest request,HttpServletResponse response)
		throws ServletException,IOException{
			response.setCharacterEncoding("UTF-8");
			int xid = Integer.parseInt(request.getParameter("xid"));
			int page = Integer.parseInt(request.getParameter("ipage"));
			MajorConnection m = new MajorConnection();
			List list = m.findMajor(xid,(page-1)*2,2);
			
			ObjectMapper om = new ObjectMapper();
			String json = om.writeValueAsString(list);
			PrintWriter pw = response.getWriter();
			pw.print(json);
		}

	}
