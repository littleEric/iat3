<?php
header("content-type:text/html;charset=utf-8");
?>
<div id="surveylist">
    <form id="demographics">
        请先完善一下信息:
        <ol id="demoglist">
            <li><p>姓名：</p>
                <p>
                    <input id="name" name="name" type="text"/>
                </p>
            </li>
            <li><p>性别</p>
                <p>
                    <input id="male" name="gender" type="radio" value="Male"/>
                    <label for="male">男</label>
                    <br>
                    <input id="female" name="gender" type="radio" value="Female"/>
                    <label for="female">女</label>
                </p>
            </li>
            <li><p><label for="age">出生年份</label></p>
                <span>
                    <select id="age" name="age">
                        <option value="unselected" selected="selected"></option>
                        <?php
                            $year = date('Y');
                            for ($i=4;$i<120;$i++)
                                echo "<option value=".($year-$i).">" . ($year-$i) . "</option>";
                        ?>
	 				</select>
                </span>
            </li>
            <li><p>手机号码：</p>
                <p>
                    <input id="tel" name="tel" type="text"/>
                </p>
            </li>
            <li><p>所处行业：</p>
                <p>
                    <input id="industry" name="industry" type="text"/>
                </p>
            </li>
            <li><p>职务：</p>
                <p>
                    <input id="job" name="job" type="text"/>
                </p>
            </li>
        </ol>
        <div id="error-1"></div>
        <input type="button" value="提交" onclick="writeBasicInfo()"/>
    </form>


</div>