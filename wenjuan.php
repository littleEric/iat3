<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>信息收集</title>
    <link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="https://cdn.bootcss.com/bootstrap-validator/0.5.3/css/bootstrapValidator.min.css" rel="stylesheet">
    <style>
        .maindiv {
            width: 500px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 30px;
        }
        .fatherdiv {
            width:700px;
            padding-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
            border:2px solid black;
            border-radius: 8px;
        }
        .spandiv {
            text-align: center;
            margin-top: 30px;
        }
        .span {
            font-size: 20px;
        }
    </style>
</head>
<body>
<div class="fatherdiv">
    <div class="spandiv">
        <span class="span">请填写您的基本信息</span>
    </div>
    <div class="maindiv" id="surveylist">
        <form id="demographics" class="form-horizontal" role="form">
            <div class="form-group">
                <label for="name" class="col-sm-2 control-label">手机尾号</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="tel" name="tel"
                           placeholder="请输入手机号后6位">
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label">性别</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="gender" id="male" value="Male" checked="checked"> 男
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="gender" id="female" value="Female"> 女
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label">出生年份</label>
                <div class="col-sm-10">
                    <select id="birthyear" name="birthyear" class="form-control">
                        <?php
                        $year = date('Y');
                        for ($i=4;$i<120;$i++)
                            echo "<option value=".($year-$i).">" . ($year-$i) . "</option>";
                        ?>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label">婚姻状况</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="ifmarried" id="married" value="已婚" checked="checked"> 已婚
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="ifmarried" id="unmarried" value="未婚"> 未婚
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label">文化程度</label>
                <div class="col-sm-10">
                    <select id="doe" name="doe" class="form-control">
                        <option value="小学">小学</option>
                        <option value="初中">初中</option>
                        <option value="高中">高中</option>
                        <option value="专科">专科</option>
                        <option value="本科">本科</option>
                        <option value="硕士研究生">硕士研究生</option>
                        <option value="博士研究生">博士研究生</option>
                    </select>
                </div>
            </div>


            <div class="form-group">
                <label for="name" class="col-sm-2 control-label">所处行业</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="industry" name="industry"
                           placeholder="请输入您所在的行业">
                </div>
            </div>

            <div class="form-group">
                <label for="name" class="col-sm-2 control-label">职务</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="job" name="job"
                           placeholder="请输入您的职务">
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label">您在该企业的工作年限</label>
                <div class="col-sm-10">
                    <select id="wt" name="wt" class="form-control">
                        <option value="1~3">1~3年</option>
                        <option value="4~6">4~6年</option>
                        <option value=">7">7年以上</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" name="submit" class="btn btn-default">提交</button>
                </div>
            </div>
        </form>
    </div>
</div>

</body>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap-validator/0.5.3/js/bootstrapValidator.min.js"></script>
<script>
    $(function () {
        $('form').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '姓名不能为空'
                        },
                        stringLength: {
                            min: 2,
                            max: 10,
                            message: '用户名长度必须在2到10位之间'
                        }
                    }
                },
                tel: {
                    validators: {
                        notEmpty: {
                            message: '手机号不能为空'
                        },
                        regexp: {
                            regexp: /^[0-9]{6}$/,
                            message: '请输入6位数字的手机尾号'
                        }
                    }
                },
                industry: {
                    validators: {
                        notEmpty: {
                            message: '所处行业不能为空'
                        },
                        stringLength: {
                            min: 2,
                            max: 20,
                            message: '所处行业长度必须在2到20位之间'
                        }
                    }
                },
                job: {
                    validators: {
                        notEmpty: {
                            message: '职务不能为空'
                        },
                        stringLength: {
                            min: 2,
                            max: 20,
                            message: '职务名称长度必须在2到20位之间'
                        }
                    }
                }
            }
        }).on('success.form.bv',function (e) {
            gender = $("input[name=gender]:checked").val();
            birthyear = $("#birthyear option:selected").val();
            tel = $.trim($('#tel').val());
            industry = $.trim($("#industry").val());
            job = $.trim($("#job").val());
            ifmarried = $("input[name=ifmarried]:checked").val();
            doe = $("#doe option:selected").val();
            wt = $("#wt option:selected").val();

            var info = "gender=" + gender + "&birthyear=" + birthyear + "&tel="+tel+"&industry="+industry+"&job="+job
                        +"&ifmarried=" + ifmarried + "&doe=" + doe + "&wt=" + wt;

            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            $.ajax({
                type: 'POST',
                url: "core/writebasicInfo.php",
                data: info,
                dataType: "json",
                success: function(data) {
                    window.location.replace(data.location+"?uuid="+data.uuid);
                    //console.log(data.location);
                }
            });
        });
    });
</script>
</html>